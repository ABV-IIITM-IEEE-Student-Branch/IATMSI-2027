import { fetchOrder, fetchPayments } from './cashfree.js';
import { recordPaymentAttempt, updateRegistration } from './db.js';
import { sendReceiptOnce } from './receiptDelivery.js';

/**
 * Brings a pending registration up to date with what Cashfree actually says.
 *
 * There are three ways a registration can be confirmed — the webhook, the
 * payer reloading the status page, and the scheduled sweep — and all three
 * have to apply identical rules. A second copy of "decide whether this counts
 * as paid" is how a system ends up confirming in one path what it refuses in
 * another, so this is the only copy the non-webhook paths use.
 *
 * Only ever promotes a registration on Cashfree's own answer, fetched
 * server-to-server with our API keys.
 *
 * @returns the registration, updated if it was confirmed.
 */
export async function reconcileRegistration(registration, origin) {
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

  if (!amountMatches(success, registration)) {
    // Same rule as the webhook: never confirm a registration for an amount
    // that isn't the one we set. Held for a human instead.
    console.error(
      `[reconcile] amount mismatch on ${registration.order_id}: paid ${success.payment_amount} ${success.payment_currency}, expected ${registration.amount} ${registration.currency}`,
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
    raw_event: { source: 'reconcile', payment: success },
  });

  const updated = await updateRegistration(registration.order_id, {
    status: 'PAID',
    cf_payment_id: success.cf_payment_id ? String(success.cf_payment_id) : null,
    paid_at: safeTimestamp(success.payment_time),
  });

  const confirmed = updated || {
    ...registration,
    status: 'PAID',
    cf_payment_id: success.cf_payment_id,
  };

  await sendReceiptOnce(confirmed, origin);
  return confirmed;
}

/**
 * Whether a payment is for exactly what we charged.
 *
 * Currency is compared as well as the number: 7,500 rupees and 7,500 dollars
 * are not the same transaction, and comparing amounts alone would accept the
 * cheaper one.
 */
export function amountMatches(payment, registration) {
  const paid = Number(payment.payment_amount);
  return (
    Number.isFinite(paid) &&
    Math.abs(paid - Number(registration.amount)) < 0.005 &&
    payment.payment_currency === registration.currency
  );
}

/**
 * Accepts a timestamp only if it parses.
 *
 * `payment_time` comes from the gateway and goes straight into a `timestamptz`
 * column. A value Postgres rejects would fail the whole update, and in the
 * webhook that means a 500, a redelivery, and the same failure again — a loop
 * that never confirms a payment that did happen.
 */
export function safeTimestamp(value) {
  const parsed = value ? new Date(value) : null;
  return parsed && !Number.isNaN(parsed.getTime())
    ? parsed.toISOString()
    : new Date().toISOString();
}
