import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { apiBase, cashfreeCredentials, isProduction, normalisePhone } from './cashfree.js';

/**
 * Gateway plumbing.
 *
 * The mode check matters more than it looks: on sandbox keys the whole flow
 * behaves as though it worked, while no money moves.
 */

afterEach(() => {
  delete process.env.CASHFREE_MODE;
  delete process.env.CASHFREE_CLIENT_ID;
  delete process.env.CASHFREE_CLIENT_SECRET;
});

describe('choosing the environment', () => {
  it('defaults to sandbox', () => {
    // Defaulting the other way would mean a missing variable pointed a
    // half-configured deployment at real money.
    expect(isProduction()).toBe(false);
    expect(apiBase()).toContain('sandbox');
  });

  it('goes live only on the exact word', () => {
    for (const value of ['Production', 'PRODUCTION', 'prod', 'live', 'true', '1']) {
      process.env.CASHFREE_MODE = value;
      expect(isProduction()).toBe(false);
    }

    process.env.CASHFREE_MODE = 'production';
    expect(isProduction()).toBe(true);
    expect(apiBase()).toBe('https://api.cashfree.com/pg');
  });
});

describe('credentials', () => {
  it('reports none unless both halves are present', () => {
    expect(cashfreeCredentials()).toBeNull();

    process.env.CASHFREE_CLIENT_ID = 'id';
    expect(cashfreeCredentials()).toBeNull();

    process.env.CASHFREE_CLIENT_SECRET = 'secret';
    expect(cashfreeCredentials()).toEqual({ clientId: 'id', clientSecret: 'secret' });
  });
});

describe('phone numbers', () => {
  it('reduces Indian numbers to the ten digits the gateway wants', () => {
    expect(normalisePhone('+91 98765 43210')).toBe('9876543210');
    expect(normalisePhone('919876543210')).toBe('9876543210');
    expect(normalisePhone('09876543210')).toBe('9876543210');
    expect(normalisePhone('9876543210')).toBe('9876543210');
  });

  it('keeps the country code on international numbers', () => {
    // Taking the last ten digits would turn +44 20 7946 0958 into 2079460958 —
    // a different number, and the registrant simply stops hearing anything.
    expect(normalisePhone('+44 20 7946 0958')).toBe('+442079460958');
    expect(normalisePhone('+1 (415) 555-0123')).toBe('+14155550123');
    expect(normalisePhone('+61 2 9374 4000')).toBe('+61293744000');
  });

  it('never invents a number', () => {
    // A placeholder would send payment messages to whoever owns it.
    expect(normalisePhone('')).toBeNull();
    expect(normalisePhone(null)).toBeNull();
    expect(normalisePhone('not a phone')).toBeNull();
  });
});
