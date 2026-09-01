/**
 * Starts a registration payment.
 *
 * The browser sends who is registering. This works out what that costs, records
 * the intent, opens an order with Cashfree and hands back a session id. The
 * price is never part of the request and never part of the response's input —
 * the only way to change what someone pays is to change `_lib/fees.js`.
 */

import { createOrder, cashfreeCredentials, isProduction } from './_lib/cashfree.js';
import { calculateFee } from './_lib/fees.js';
import { insertRegistration, supabaseCredentials } from './_lib/db.js';
import { generateOrderId, parseRegistration } from './_lib/registrationInput.js';
import { siteOrigin } from './_lib/origin.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (!cashfreeCredentials() || !supabaseCredentials()) {
    // Say this plainly rather than failing in a way that looks like the payer's
    // fault. Names of missing variables only — never their values.
    return res.status(503).json({
      error: 'Online payment is not available yet. Please try again later.',
      missing: [
        'CASHFREE_CLIENT_ID',
        'CASHFREE_CLIENT_SECRET',
        'SUPABASE_URL',
        'SUPABASE_SERVICE_ROLE_KEY',
      ].filter((name) => !process.env[name]),
    });
  }

  const parsed = parseRegistration(req.body);
  if (!parsed.ok) {
    return res.status(400).json({ error: parsed.error });
  }

  const registration = parsed.value;

  let fee;
  try {
    fee = calculateFee(registration.category, registration.region, registration.membership);
  } catch (error) {
    // Only reachable if the fee table has a gap, since the selections were
    // validated above. Charging a guessed amount instead is not an option.
    console.error('[create-order] fee lookup failed', error);
    return res.status(500).json({ error: 'This registration category is not available. Please contact the organisers.' });
  }

  const orderId = generateOrderId();
  const origin = siteOrigin(req);

  try {
    await insertRegistration({
      ...registration,
      order_id: orderId,
      period: fee.period,
      currency: fee.currency,
      amount: fee.amount,
      status: 'PENDING',
    });
  } catch (error) {
    console.error('[create-order] could not record registration', error);
    return res.status(500).json({ error: 'Could not start your registration. Please try again.' });
  }

  try {
    const order = await createOrder({
      orderId,
      amount: fee.amount,
      currency: fee.currency,
      customerId: orderId,
      name: registration.full_name,
      email: registration.email,
      phone: registration.phone,
      returnUrl: `${origin}/registration/payment?order_id=${encodeURIComponent(orderId)}`,
      notifyUrl: `${origin}/api/webhook`,
    });

    return res.status(200).json({
      orderId,
      paymentSessionId: order.paymentSessionId,
      amount: fee.amount,
      currency: fee.currency,
      period: fee.period,
      mode: isProduction() ? 'production' : 'sandbox',
    });
  } catch (error) {
    // The registration row stays behind as PENDING. That is intentional: it
    // records that someone tried, which is what makes an abandoned attempt
    // distinguishable from one that never happened.
    console.error('[create-order] Cashfree order failed', error);
    return res.status(502).json({ error: 'The payment gateway could not be reached. Please try again in a moment.' });
  }
}
