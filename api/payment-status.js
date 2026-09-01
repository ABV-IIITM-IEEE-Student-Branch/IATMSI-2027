/**
 * What happened to a registration payment.
 *
 * Read by the page the payer lands on after checkout. That page's query string
 * is not evidence of anything — it is whatever URL was opened — so nothing here
 * trusts it beyond using the order id to look the registration up.
 *
 * The order id is the capability: it is 24 random hex characters, so it cannot
 * be guessed or walked, and holding it is what entitles the holder to see the
 * receipt. Nothing else about the registration is exposed.
 *
 * If the row is still pending, this asks Cashfree directly rather than waiting.
 * Webhooks can be delayed or lost, and a payer staring at "pending" after their
 * money has left is the worst outcome available here.
 */

import { fetchOrder, fetchPayments, cashfreeCredentials } from './_lib/cashfree.js';
import {
  findRegistration,
  recordPaymentAttempt,
  supabaseCredentials,
  updateRegistration,
} from './_lib/db.js';
import { toReceipt } from './_lib/receipt.js';
import { sendReceiptOnce } from './_lib/receiptDelivery.js';
import { siteOrigin } from './_lib/origin.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const orderId = String(req.query.order_id || '').trim();
  if (!orderId || orderId.length > 80) {
    return res.status(400).json({ error: 'Missing order id.' });
  }

  if (!supabaseCredentials()) {
    return res.status(503).json({ error: 'Registration records are not available right now.' });
  }

  try {
    let registration = await findRegistration(orderId);
    if (!registration) {
      // Same response whether the id is wrong or simply unknown, so this
      // cannot be used to test which order ids exist.
      return res.status(404).json({ error: 'No registration found for that order.' });
    }

    if (registration.status === 'PENDING' && cashfreeCredentials()) {
      registration = await reconcile(registration, siteOrigin(req));
    }

    return res.status(200).json({ receipt: toReceipt(registration) });
  } catch (error) {
    console.error('[payment-status]', error);
    return res.status(500).json({ error: 'Could not check the payment status.' });
  }
}

/**
 * Brings a pending registration up to date with what Cashfree actually says.
 *
 * Only ever promotes a registration on Cashfree's own answer, fetched
 * server-to-server with our API keys — the same standard as the webhook, since
 * this can confirm a registration on its own when a webhook was missed.
 */
async function reconcile(registration, origin) {
  const order = await fetchOrder(registration.order_id);

  if (order.orderStatus !== 'PAID') {
    // ACTIVE means checkout was never completed; EXPIRED and TERMINATED are
    // dead ends. None of them are a payment, so leave the row alone — the
    // payer can start again with a new order.
    return registration;
  }

  const payments = await fetchPayments(registration.order_id);
  const success = payments.find((p) => p.payment_status === 'SUCCESS');
  if (!success) return registration;

  const paidAmount = Number(success.payment_amount);
  if (
    !Number.isFinite(paidAmount) ||
    Math.abs(paidAmount - Number(registration.amount)) > 0.01 ||
    success.payment_currency !== registration.currency
  ) {
    // Same rule as the webhook: never confirm a registration for an amount
    // that isn't the one we set. Held for a human instead.
    console.error(
      `[payment-status] amount mismatch on ${registration.order_id}: paid ${success.payment_amount} ${success.payment_currency}, expected ${registration.amount} ${registration.currency}`,
    );
    return registration;
  }

  await recordPaymentAttempt({
    order_id: registration.order_id,
    cf_payment_id: success.cf_payment_id ? String(success.cf_payment_id) : null,
    payment_status: success.payment_status,
    payment_amount: success.payment_amount ?? null,
    payment_currency: success.payment_currency || null,
    payment_method: typeof success.payment_group === 'string' ? success.payment_group : null,
    raw_event: { source: 'payment-status-reconcile', payment: success },
  });

  const updated = await updateRegistration(registration.order_id, {
    status: 'PAID',
    cf_payment_id: success.cf_payment_id ? String(success.cf_payment_id) : null,
    paid_at: success.payment_time || new Date().toISOString(),
  });

  const confirmed = updated || { ...registration, status: 'PAID', cf_payment_id: success.cf_payment_id };
  await sendReceiptOnce(confirmed, origin);
  return confirmed;
}
