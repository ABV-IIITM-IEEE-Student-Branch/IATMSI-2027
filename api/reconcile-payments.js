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
import { findUnconfirmedRegistrations, supabaseCredentials } from './_lib/db.js';
import { reconcileRegistration } from './_lib/reconcile.js';
import { siteOrigin } from './_lib/origin.js';

/** How long after starting checkout an order is considered settled either way. */
const SETTLE_MINUTES = 15;

/** Orders older than this are past every retry window; a human should look instead. */
const GIVE_UP_DAYS = 7;

/** Kept small so one run stays well inside the function's time budget. */
const BATCH = 25;

/**
 * When to stop and leave the rest for the next run.
 *
 * Each row can cost two gateway calls, a few database round trips and a
 * receipt email — and the email alone is allowed twelve seconds. A backlog
 * (the webhook endpoint was down for a day, say) would otherwise run past the
 * function's 60s ceiling and be killed mid-batch.
 *
 * Stopping early is safe because every row is confirmed independently and the
 * work already done is committed; the next run simply picks up where this one
 * left off. Being killed is not obviously worse, but it is silent, and it
 * makes the run's own report a lie.
 */
const TIME_BUDGET_MS = 45_000;

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
  const startedAfter = new Date(now - GIVE_UP_DAYS * 24 * 60 * 60_000).toISOString();

  try {
    // Both bounds go to the query. Skipping old rows here instead would let
    // abandoned checkouts — which stay unconfirmed forever — fill the batch
    // and crowd out the payments this exists to catch.
    const candidates = await findUnconfirmedRegistrations({
      startedBefore,
      startedAfter,
      limit: BATCH,
    });

    let confirmed = 0;
    let stillUnconfirmed = 0;
    let failed = 0;
    let checked = 0;
    let ranOutOfTime = false;

    for (const registration of candidates) {
      if (Date.now() - now > TIME_BUDGET_MS) {
        ranOutOfTime = true;
        break;
      }
      checked += 1;

      try {
        const result = await reconcileRegistration(registration, siteOrigin(req));
        if (result.status === 'PAID') confirmed += 1;
        else stillUnconfirmed += 1;
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
      `[reconcile-payments] checked ${checked} of ${candidates.length}: ${confirmed} confirmed, ` +
        `${stillUnconfirmed} still unconfirmed, ${failed} errored` +
        (ranOutOfTime ? ' — stopped on time budget, remainder next run' : ''),
    );

    return res.status(200).json({
      checked,
      found: candidates.length,
      confirmed,
      stillUnconfirmed,
      failed,
      ranOutOfTime,
    });
  } catch (error) {
    console.error('[reconcile-payments]', error);
    return res.status(500).json({ error: 'Sweep failed.' });
  }
}
