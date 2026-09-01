/**
 * The published fee table, for display.
 *
 * The page shows prices from here rather than keeping its own copy, so the
 * amount someone reads is by construction the amount they will be charged. A
 * second table in `src/data` would be a table that can disagree with the one
 * doing the charging, and the disagreement would surface at the worst moment.
 *
 * Read-only, and it decides nothing: `create-order.js` recalculates the amount
 * from the same module rather than trusting anything that came back from here.
 */

import {
  CATEGORIES,
  CATEGORY_LABELS,
  EARLY_BIRD_CUTOFF,
  FEE_TABLE,
  MEMBERSHIPS,
  PERIODS,
  REGIONS,
  getPeriod,
} from './_lib/fees.js';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  // Safe to cache: the table only changes on a deploy. The window is short so
  // that the switch from early-bird to regular pricing shows up promptly
  // rather than an hour late.
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

  return res.status(200).json({
    categories: CATEGORIES,
    categoryLabels: CATEGORY_LABELS,
    regions: REGIONS,
    memberships: MEMBERSHIPS,
    periods: PERIODS,
    table: FEE_TABLE,
    currentPeriod: getPeriod(),
    earlyBirdCutoff: EARLY_BIRD_CUTOFF,
  });
}
