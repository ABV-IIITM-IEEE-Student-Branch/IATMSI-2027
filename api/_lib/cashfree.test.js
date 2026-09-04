import { afterEach, describe, expect, it, vi } from 'vitest';
import { apiBase, cashfreeCredentials, fetchOrder, isProduction, normalisePhone } from './cashfree.js';

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
  vi.restoreAllMocks();
});

function withCredentials() {
  process.env.CASHFREE_CLIENT_ID = 'id';
  process.env.CASHFREE_CLIENT_SECRET = 'secret';
}

function mockGateway(status, body) {
  global.fetch = vi.fn(async () => ({ ok: status < 400, status, json: async () => body }));
}

describe('reading an order', () => {
  it('returns null when the gateway has never heard of it', async () => {
    // Not an error. Order creation can fail after the row is written, leaving
    // nothing at the gateway to match it — a settled question. Throwing would
    // make the daily sweep re-ask it forever and log an error each time.
    withCredentials();
    mockGateway(404, { message: 'order does not exist' });

    await expect(fetchOrder('IATMSI27-missing')).resolves.toBeNull();
  });

  it('still throws on a real failure', async () => {
    // A 500 or an auth failure IS transient or misconfigured, and must not be
    // mistaken for "no such order" — that would silently abandon a real
    // payment.
    withCredentials();
    mockGateway(500, { message: 'internal error' });
    await expect(fetchOrder('IATMSI27-x')).rejects.toThrow();

    mockGateway(401, { message: 'authentication failed' });
    await expect(fetchOrder('IATMSI27-x')).rejects.toThrow();
  });

  it('returns the order when it exists', async () => {
    withCredentials();
    mockGateway(200, {
      order_id: 'IATMSI27-x', order_status: 'PAID',
      order_amount: 7500, order_currency: 'INR',
    });

    await expect(fetchOrder('IATMSI27-x')).resolves.toMatchObject({
      orderStatus: 'PAID', orderAmount: 7500, orderCurrency: 'INR',
    });
  });
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
