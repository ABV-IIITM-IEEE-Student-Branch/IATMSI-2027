/**
 * Cashfree's payment notification.
 *
 * This is what confirms a registration — not the payer's browser coming back
 * from checkout, which proves nothing and can be forged by opening a URL. So
 * the signature is checked before the body is even parsed, and a delivery that
 * fails that check is refused without touching the database.
 */

import { verifySignature, readRawBody } from './_lib/webhook.js';
import {
  findRegistration,
  recordPaymentAttempt,
  updateRegistration,
} from './_lib/db.js';
import { sendReceiptOnce } from './_lib/receiptDelivery.js';
import { amountMatches, safeTimestamp } from './_lib/reconcile.js';
import { siteOrigin } from './_lib/origin.js';

// Vercel parses JSON bodies by default, which reorders keys and drops
// whitespace. The signature covers the exact bytes Cashfree sent, so those
// bytes have to survive intact — hence no parsing here.
export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  let rawBody;
  try {
    rawBody = await readRawBody(req);
  } catch (error) {
    console.error('[webhook] could not read body', error);
    return res.status(400).json({ error: 'Bad request.' });
  }

  const signature = req.headers['x-webhook-signature'];
  const timestamp = req.headers['x-webhook-timestamp'];

  if (!verifySignature(rawBody, signature, timestamp)) {
    // No detail in the response: an unsigned caller learns only that it was
    // rejected, not which part was wrong.
    console.warn('[webhook] rejected a delivery with an invalid signature');
    return res.status(401).json({ error: 'Invalid signature.' });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return res.status(400).json({ error: 'Malformed payload.' });
  }

  const order = event?.data?.order || {};
  const payment = event?.data?.payment || {};
  const orderId = order.order_id;

  if (!orderId) {
    // Cashfree's dashboard "test webhook" button sends a payload with no real
    // order. It is correctly signed, so acknowledge it rather than retrying.
    return res.status(200).json({ received: true, note: 'No order id in payload.' });
  }

  // Only payment events are understood here. Refunds, settlements and disputes
  // carry a different shape — no `data.payment` — and would otherwise be
  // recorded as a payment attempt with no id and no status, and then counted
  // as "not a success" and used to mark a pending registration failed.
  //
  // Nothing subscribes to those today. This exists because subscriptions are
  // changed in a dashboard, by someone who will not be reading this file.
  if (!payment.payment_status) {
    console.warn(`[webhook] ignoring a non-payment event for ${orderId}: ${event?.type || 'unknown type'}`);
    return res.status(200).json({ received: true, note: 'Not a payment event.' });
  }

  try {
    const registration = await findRegistration(orderId);
    if (!registration) {
      // Nothing to attach this to. Retrying will not conjure the row, so
      // acknowledge and record it in the log instead of looping.
      console.warn(`[webhook] no registration for order ${orderId}`);
      return res.status(200).json({ received: true, note: 'Unknown order.' });
    }

    // Written first and keyed on the payment id, so a retried delivery merges
    // into the row it already wrote instead of adding a second one.
    await recordPaymentAttempt({
      order_id: orderId,
      cf_payment_id: payment.cf_payment_id ? String(payment.cf_payment_id) : null,
      payment_status: payment.payment_status || null,
      payment_amount: payment.payment_amount ?? null,
      payment_currency: payment.payment_currency || null,
      payment_method: typeof payment.payment_group === 'string' ? payment.payment_group : null,
      raw_event: event,
    });

    if (payment.payment_status !== 'SUCCESS') {
      // FAILED, USER_DROPPED and the rest. Recorded above; the registration
      // stays unconfirmed so the payer can try again with a new order.
      if (registration.status === 'PENDING') {
        await updateRegistration(orderId, { status: 'FAILED' });
      }
      return res.status(200).json({ received: true });
    }

    // Defence in depth. The amount was set by us when the order was created,
    // so this should never differ — but confirming a registration for less
    // than it costs is exactly the failure worth an extra comparison.
    //
    // Shared with the reconciliation paths, so all three ways a registration
    // can be confirmed apply the same rule.
    if (!amountMatches(payment, registration)) {
      console.error(
        `[webhook] amount mismatch on ${orderId}: paid ${payment.payment_amount} ${payment.payment_currency}, expected ${registration.amount} ${registration.currency}`,
      );
      // Left unconfirmed on purpose, for a human to look at. Retrying would
      // not change the numbers, so the delivery is acknowledged.
      return res.status(200).json({ received: true, note: 'Amount mismatch; held for review.' });
    }

    let confirmed = registration;
    if (registration.status !== 'PAID') {
      confirmed = (await updateRegistration(orderId, {
        status: 'PAID',
        cf_payment_id: payment.cf_payment_id ? String(payment.cf_payment_id) : null,
        // Never written straight from the gateway: a value Postgres rejects
        // would fail this update, return 500, and be redelivered into the
        // same failure forever.
        paid_at: safeTimestamp(payment.payment_time),
      })) || registration;
    }

    // The row as it now stands, so the receipt states what was actually
    // recorded rather than the pre-update copy read at the top.
    await sendReceiptOnce(confirmed, siteOrigin(req));

    return res.status(200).json({ received: true });
  } catch (error) {
    // A real failure on our side. 500 asks Cashfree to deliver it again, which
    // is what we want — the attempt is idempotent.
    console.error('[webhook] processing failed', error);
    return res.status(500).json({ error: 'Could not process the notification.' });
  }
}
