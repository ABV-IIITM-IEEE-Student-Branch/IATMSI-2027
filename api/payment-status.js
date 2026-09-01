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

import { cashfreeCredentials } from './_lib/cashfree.js';
import { findRegistration, supabaseCredentials } from './_lib/db.js';
import { toReceipt } from './_lib/receipt.js';
import { reconcileRegistration } from './_lib/reconcile.js';
import { siteOrigin } from './_lib/origin.js';

// Every id this endpoint can legitimately be asked about is one we generated.
const ORDER_ID = /^IATMSI27-[0-9a-f]{24}$/;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const orderId = String(req.query.order_id || '').trim();

  // Checked against the shape we issue rather than just a length. Anything
  // else cannot match a row, so it is turned away before it reaches the
  // database instead of after.
  if (!ORDER_ID.test(orderId)) {
    return res.status(400).json({ error: 'Missing or malformed order id.' });
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
      registration = await reconcileRegistration(registration, siteOrigin(req));
    }

    return res.status(200).json({ receipt: toReceipt(registration) });
  } catch (error) {
    console.error('[payment-status]', error);
    return res.status(500).json({ error: 'Could not check the payment status.' });
  }
}
