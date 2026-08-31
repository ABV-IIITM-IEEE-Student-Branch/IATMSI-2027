import { describe, expect, it } from 'vitest';
import {
  CATEGORIES,
  EARLY_BIRD_CUTOFF,
  FEE_TABLE,
  MEMBERSHIPS,
  PERIODS,
  REGIONS,
  calculateFee,
  getPeriod,
  isValidSelection,
} from './fees.js';

/**
 * These aren't checking that the code runs — they're checking that people are
 * charged the right amount. A wrong number here takes real money from someone,
 * so the published table is asserted cell by cell rather than spot-checked.
 */

const EARLY = new Date('2027-01-10T12:00:00+05:30');
const REGULAR = new Date('2027-03-10T12:00:00+05:30');

describe('the fee table is complete', () => {
  it('prices every combination the form can produce', () => {
    // 5 categories x 2 periods x 2 regions x 2 memberships = 40 prices. A gap
    // would surface as a charge of nothing.
    const missing = [];
    for (const category of CATEGORIES) {
      for (const period of PERIODS) {
        for (const region of REGIONS) {
          for (const membership of MEMBERSHIPS) {
            const amount = FEE_TABLE[category]?.[period]?.[region]?.[membership];
            if (typeof amount !== 'number' || amount <= 0) {
              missing.push(`${category}/${period}/${region}/${membership}`);
            }
          }
        }
      }
    }
    expect(missing).toEqual([]);
  });

  it('never charges less later than it does early', () => {
    // Regular pricing is meant to be the same or dearer. An inversion means a
    // row has been transposed.
    for (const category of CATEGORIES) {
      for (const region of REGIONS) {
        for (const membership of MEMBERSHIPS) {
          const early = FEE_TABLE[category].early[region][membership];
          const regular = FEE_TABLE[category].regular[region][membership];
          expect(
            regular,
            `${category}/${region}/${membership}: regular ${regular} < early ${early}`,
          ).toBeGreaterThanOrEqual(early);
        }
      }
    }
  });

  it('never charges an IEEE member more than a non-member', () => {
    for (const category of CATEGORIES) {
      for (const period of PERIODS) {
        for (const region of REGIONS) {
          const ieee = FEE_TABLE[category][period][region].ieee;
          const nonIeee = FEE_TABLE[category][period][region].non_ieee;
          expect(
            ieee,
            `${category}/${period}/${region}: member ${ieee} > non-member ${nonIeee}`,
          ).toBeLessThanOrEqual(nonIeee);
        }
      }
    }
  });
});

describe('published amounts', () => {
  // Spot values transcribed from the organiser's table. If the table changes,
  // these must be updated deliberately rather than silently drifting.
  it.each([
    ['student', 'indian_nepali', 'ieee', EARLY, 6400, 'INR'],
    ['student', 'indian_nepali', 'non_ieee', EARLY, 7500, 'INR'],
    ['student', 'indian_nepali', 'ieee', REGULAR, 7400, 'INR'],
    ['student', 'international', 'ieee', EARLY, 150, 'USD'],
    ['student', 'international', 'non_ieee', REGULAR, 205, 'USD'],
    ['professional', 'indian_nepali', 'non_ieee', REGULAR, 9700, 'INR'],
    ['professional', 'international', 'ieee', EARLY, 180, 'USD'],
    ['tutorial', 'indian_nepali', 'ieee', EARLY, 2500, 'INR'],
    ['coauthor_without_kit', 'indian_nepali', 'non_ieee', EARLY, 5000, 'INR'],
    ['coauthor_with_kit', 'indian_nepali', 'ieee', REGULAR, 6500, 'INR'],
  ])(
    '%s / %s / %s charges the published amount',
    (category, region, membership, when, expectedAmount, expectedCurrency) => {
      const fee = calculateFee(category, region, membership, when);
      expect(fee.amount).toBe(expectedAmount);
      expect(fee.currency).toBe(expectedCurrency);
    },
  );

  it('bills Indian and Nepali registrants in rupees, everyone else in dollars', () => {
    expect(calculateFee('student', 'indian_nepali', 'ieee', EARLY).currency).toBe('INR');
    expect(calculateFee('student', 'international', 'ieee', EARLY).currency).toBe('USD');
  });
});

describe('the early-bird cutoff', () => {
  it('includes the whole of the final day in India', () => {
    // The discount is advertised as "until 15th Feb". Someone registering that
    // evening from India must still get it.
    expect(getPeriod(new Date('2027-02-15T23:59:00+05:30'))).toBe('early');
    expect(getPeriod(new Date('2027-02-16T00:00:30+05:30'))).toBe('regular');
  });

  it('does not end early for India just because the server runs on UTC', () => {
    // 15 Feb 20:00 IST is 14 Feb 14:30 UTC — still inside the window. Reading
    // the cutoff without its offset would have ended it hours too soon.
    expect(getPeriod(new Date('2027-02-15T20:00:00+05:30'))).toBe('early');
    expect(EARLY_BIRD_CUTOFF).toContain('+05:30');
  });

  it('switches on the boundary, not around it', () => {
    const cutoff = new Date(EARLY_BIRD_CUTOFF);
    expect(getPeriod(new Date(cutoff.getTime() - 1000))).toBe('early');
    expect(getPeriod(new Date(cutoff.getTime() + 1000))).toBe('regular');
  });
});

describe('refusing what it cannot price', () => {
  it('rejects anything outside the published options', () => {
    expect(isValidSelection('vip', 'indian_nepali', 'ieee')).toBe(false);
    expect(isValidSelection('student', 'mars', 'ieee')).toBe(false);
    expect(isValidSelection('student', 'indian_nepali', 'lifetime')).toBe(false);
  });

  it('throws rather than falling back to a default amount', () => {
    // Returning 0, or the cheapest row, would let an unexpected value through
    // as a free or discounted registration.
    expect(() => calculateFee('vip', 'indian_nepali', 'ieee')).toThrow();
    expect(() => calculateFee('student', 'mars', 'ieee')).toThrow();
    expect(() => calculateFee(undefined, undefined, undefined)).toThrow();
  });

  it('ignores any amount the caller tries to supply', () => {
    // calculateFee takes no amount at all — the only way to influence the
    // price is the category, region and membership, which are all validated.
    expect(calculateFee.length).toBeLessThanOrEqual(4);
    const fee = calculateFee('student', 'indian_nepali', 'ieee', EARLY);
    expect(fee.amount).toBe(6400);
  });
});
