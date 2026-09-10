/**
 * The published fee table, for display.
 *
 * Kept as an endpoint rather than moved into `src/data` for one reason: the
 * forty amounts here are covered by tests that assert the table is complete,
 * that regular never undercuts early-bird, and that a member never pays more
 * than a non-member. Retyping them into a data file to save a request would
 * trade that for nothing.
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
