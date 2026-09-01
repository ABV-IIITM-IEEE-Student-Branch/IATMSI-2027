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
    const paidAmount = Number(payment.payment_amount);
    const expected = Number(registration.amount);
    if (
      !Number.isFinite(paidAmount) ||
      Math.abs(paidAmount - expected) > 0.01 ||
      payment.payment_currency !== registration.currency
    ) {
      console.error(
        `[webhook] amount mismatch on ${orderId}: paid ${payment.payment_amount} ${payment.payment_currency}, expected ${expected} ${registration.currency}`,
      );
      // Left unconfirmed on purpose, for a human to look at. Retrying would
      // not change the numbers, so the delivery is acknowledged.
      return res.status(200).json({ received: true, note: 'Amount mismatch; held for review.' });
    }

    if (registration.status !== 'PAID') {
      await updateRegistration(orderId, {
        status: 'PAID',
        cf_payment_id: payment.cf_payment_id ? String(payment.cf_payment_id) : null,
        paid_at: payment.payment_time || new Date().toISOString(),
      });
    }

    await sendReceiptOnce(
      { ...registration, status: 'PAID', cf_payment_id: payment.cf_payment_id },
      siteOrigin(req),
    );

    return res.status(200).json({ received: true });
  } catch (error) {
    // A real failure on our side. 500 asks Cashfree to deliver it again, which
    // is what we want — the attempt is idempotent.
    console.error('[webhook] processing failed', error);
    return res.status(500).json({ error: 'Could not process the notification.' });
  }
}
