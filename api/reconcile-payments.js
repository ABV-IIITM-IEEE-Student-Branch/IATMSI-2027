/**
 * Scheduled sweep for payments that were never confirmed.
 *
 * The webhook is the normal path and the status page is the usual backstop,
 * but both can miss. If Cashfree's deliveries all fail — the site was down, the
 * signing secret was briefly wrong, the endpoint 500ed through the whole retry
 * window — and the payer never reopens the receipt link, then their money has
 * been taken and the registration sits at PENDING with nobody looking at it.
 *
 * This closes that gap: every pending order old enough to have settled is
 * checked against Cashfree directly, by the same rules the other two paths use.
 *
 * Runs on a Vercel Cron schedule (see vercel.json) and is not meant to be
 * called by hand.
 */

import { cashfreeCredentials } from './_lib/cashfree.js';
import { findPendingRegistrations, supabaseCredentials } from './_lib/db.js';
import { reconcileRegistration } from './_lib/reconcile.js';
import { siteOrigin } from './_lib/origin.js';

/** How long after starting checkout an order is considered settled either way. */
const SETTLE_MINUTES = 15;

/** Orders older than this are past every retry window; a human should look instead. */
const GIVE_UP_DAYS = 7;

/** Kept small so one run stays well inside the function's time budget. */
const BATCH = 25;

function authorised(req) {
  const secret = process.env.CRON_SECRET;
  // Fail closed. Without a secret this endpoint would let anyone make the
  // server issue a burst of gateway API calls.
  if (!secret) return false;
  return req.headers.authorization === `Bearer ${secret}`;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (!authorised(req)) {
    return res.status(401).json({ error: 'Unauthorised.' });
  }

  if (!supabaseCredentials() || !cashfreeCredentials()) {
    return res.status(503).json({ error: 'Not configured.' });
  }

  const now = Date.now();
  const startedBefore = new Date(now - SETTLE_MINUTES * 60_000).toISOString();
  const giveUpBefore = now - GIVE_UP_DAYS * 24 * 60 * 60_000;

  try {
    const pending = await findPendingRegistrations({ startedBefore, limit: BATCH });

    let confirmed = 0;
    let stillPending = 0;
    let abandoned = 0;
    let failed = 0;

    for (const registration of pending) {
      if (new Date(registration.created_at).getTime() < giveUpBefore) {
        // Long past settling. Left alone rather than queried forever; these
        // are almost all checkouts that were simply never completed.
        abandoned += 1;
        continue;
      }

      try {
        const result = await reconcileRegistration(registration, siteOrigin(req));
        if (result.status === 'PAID') confirmed += 1;
        else stillPending += 1;
      } catch (error) {
        // One unreachable order must not stop the rest of the batch.
        console.error(`[reconcile-payments] ${registration.order_id} failed`, error);
        failed += 1;
      }
    }

    // Logged as well as returned: the cron's own response goes nowhere a
    // human will see, and a run that starts confirming payments is exactly
    // the thing worth noticing in the logs.
    console.log(
      `[reconcile-payments] checked ${pending.length}: ${confirmed} confirmed, ${stillPending} still pending, ${abandoned} abandoned, ${failed} errored`,
    );

    return res.status(200).json({
      checked: pending.length,
      confirmed,
      stillPending,
      abandoned,
      failed,
    });
  } catch (error) {
    console.error('[reconcile-payments]', error);
    return res.status(500).json({ error: 'Sweep failed.' });
  }
}
