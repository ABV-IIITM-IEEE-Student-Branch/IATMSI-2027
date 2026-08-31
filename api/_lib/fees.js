/**
 * Registration fees.
 *
 * This is the only place an amount is ever decided. Nothing here reads a
 * price from the request: the browser sends who the registrant is, and the
 * server works out what that costs. Accepting an amount from the page would
 * let anyone register for whatever they liked by editing the request.
 *
 * It also deliberately sits outside `src/data`, so it is not editable through
 * the visual editor. Labels shown on the page are content; the numbers people
 * are charged are not, and a mis-click should never change a price.
 *
 * Under `api/_lib` because Vercel treats files in `api/` as endpoints, and the
 * leading underscore keeps this one from being served as a route.
 */

export const CATEGORIES = [
  'tutorial',
  'student',
  'professional',
  'coauthor_without_kit',
  'coauthor_with_kit',
];

export const REGIONS = ['indian_nepali', 'international'];
export const MEMBERSHIPS = ['ieee', 'non_ieee'];
export const PERIODS = ['early', 'regular'];

export const CATEGORY_LABELS = {
  tutorial: 'Tutorial/Workshop Attendee',
  student: 'Student Authors (UG/PG/PhD/Any Other)',
  professional: 'Professional Authors (Academician/Industry/Any Other)',
  coauthor_without_kit:
    'Co-Authors/Attendees/Accompanying Person (without Conference Kit)',
  coauthor_with_kit:
    'Co-Authors/Attendees/Accompanying Person (with Conference Kit)',
};

/**
 * The conference's published fee table.
 *
 * Indian and Nepali registrants pay in INR, everyone else in USD — these are
 * separate published prices, not a conversion, so they must never be derived
 * from one another by an exchange rate.
 *
 * Every leaf is { ieee, non_ieee }. A missing entry is a bug that would charge
 * someone nothing, so the tests assert the table is complete rather than
 * relying on it looking right.
 */
export const FEE_TABLE = {
  tutorial: {
    early: {
      indian_nepali: { ieee: 2500, non_ieee: 3000 },
      international: { ieee: 80, non_ieee: 100 },
    },
    regular: {
      indian_nepali: { ieee: 3000, non_ieee: 3500 },
      international: { ieee: 100, non_ieee: 120 },
    },
  },
  student: {
    early: {
      indian_nepali: { ieee: 6400, non_ieee: 7500 },
      international: { ieee: 150, non_ieee: 180 },
    },
    regular: {
      indian_nepali: { ieee: 7400, non_ieee: 8500 },
      international: { ieee: 175, non_ieee: 205 },
    },
  },
  professional: {
    early: {
      indian_nepali: { ieee: 7600, non_ieee: 8700 },
      international: { ieee: 180, non_ieee: 210 },
    },
    regular: {
      indian_nepali: { ieee: 8600, non_ieee: 9700 },
      international: { ieee: 210, non_ieee: 240 },
    },
  },
  coauthor_without_kit: {
    early: {
      indian_nepali: { ieee: 4000, non_ieee: 5000 },
      international: { ieee: 100, non_ieee: 120 },
    },
    regular: {
      indian_nepali: { ieee: 4500, non_ieee: 5500 },
      international: { ieee: 120, non_ieee: 140 },
    },
  },
  coauthor_with_kit: {
    early: {
      indian_nepali: { ieee: 5500, non_ieee: 6500 },
      international: { ieee: 120, non_ieee: 140 },
    },
    regular: {
      indian_nepali: { ieee: 6500, non_ieee: 7500 },
      international: { ieee: 140, non_ieee: 160 },
    },
  },
};

/**
 * End of early-bird pricing, inclusive of the whole of 15 Feb 2027 in India.
 *
 * The offset is written explicitly rather than left to the server's clock:
 * Vercel runs in UTC, so "15 Feb" without a zone would end the discount five
 * and a half hours early for everyone in India.
 */
export const EARLY_BIRD_CUTOFF = '2027-02-15T23:59:59+05:30';

export function getPeriod(now = new Date()) {
  return now.getTime() <= new Date(EARLY_BIRD_CUTOFF).getTime()
    ? 'early'
    : 'regular';
}

export function getCurrency(region) {
  return region === 'international' ? 'USD' : 'INR';
}

/** Whether a combination is one the fee table actually prices. */
export function isValidSelection(category, region, membership) {
  return (
    CATEGORIES.includes(category) &&
    REGIONS.includes(region) &&
    MEMBERSHIPS.includes(membership)
  );
}

/**
 * Works out what someone owes. Throws rather than returning a default: an
 * unpriced combination means the caller sent something unexpected, and
 * guessing an amount is the one thing that must never happen here.
 */
export function calculateFee(category, region, membership, now = new Date()) {
  if (!isValidSelection(category, region, membership)) {
    throw new Error(
      `No published fee for category="${category}", region="${region}", membership="${membership}"`,
    );
  }

  const period = getPeriod(now);
  const amount = FEE_TABLE[category][period][region][membership];

  if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) {
    throw new Error(
      `Fee table has no usable amount for ${category}/${period}/${region}/${membership}`,
    );
  }

  return { period, currency: getCurrency(region), amount };
}
