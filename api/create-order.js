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
import { checkRateLimit } from './_lib/rateLimit.js';
import { siteOrigin } from './_lib/origin.js';

/** Vercel puts the caller's country on every request; no IP lookup needed. */
function countryOf(req) {
  const code = String(req.headers['x-vercel-ip-country'] || '').toUpperCase();
  return /^[A-Z]{2}$/.test(code) ? code : null;
}

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

  // After validation, so a malformed request doesn't spend anyone's budget,
  // and before anything is written or any order is opened.
  const { allowed } = await checkRateLimit(req, 'create-order');
  if (!allowed) {
    return res.status(429).json({
      error: 'Too many registration attempts from this connection. Please wait a few minutes and try again.',
    });
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
      // Recorded, not enforced. `region` is self-declared and sets the price,
      // and the domestic rate is around half the international one — so the
      // organisers get to see where the request actually came from. A delegate
      // registering while abroad is perfectly normal, which is exactly why this
      // is evidence for a human rather than a rule.
      payer_country: countryOf(req),
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
