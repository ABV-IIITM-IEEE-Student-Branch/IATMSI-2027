import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * The scheduled sweep.
 *
 * It can confirm payments and send receipts, and it makes gateway calls in a
 * loop, so the two things that matter are that only the cron can invoke it and
 * that one bad row cannot take out the batch.
 */

const findPendingRegistrations = vi.fn();
const reconcileRegistration = vi.fn();

vi.mock('./_lib/db.js', () => ({
  findPendingRegistrations: (...a) => findPendingRegistrations(...a),
  supabaseCredentials: () => ({ url: 'https://p.supabase.co', key: 'k' }),
}));

vi.mock('./_lib/cashfree.js', () => ({
  cashfreeCredentials: () => ({ clientId: 'i', clientSecret: 's' }),
}));

vi.mock('./_lib/reconcile.js', () => ({
  reconcileRegistration: (...a) => reconcileRegistration(...a),
}));

const { default: handler } = await import('./reconcile-payments.js');

const SECRET = 'cron-secret-value';

function pending(overrides = {}) {
  return {
    order_id: `IATMSI27-${Math.random().toString(16).slice(2).padEnd(24, '0').slice(0, 24)}`,
    status: 'PENDING',
    created_at: new Date(Date.now() - 60 * 60_000).toISOString(),
    ...overrides,
  };
}

// A sentinel rather than `undefined`: a default parameter fires on an explicit
// undefined too, so "send no header" would otherwise send the valid one and
// the test would pass without testing anything.
const NO_HEADER = Symbol('no authorization header');

function call({ authorization = `Bearer ${SECRET}` } = {}) {
  const headers = { host: 'x' };
  if (authorization !== NO_HEADER) headers.authorization = authorization;

  const res = {
    statusCode: 0,
    payload: undefined,
    setHeader() {},
    status(code) { this.statusCode = code; return this; },
    json(body) { this.payload = body; return this; },
  };
  return handler({ method: 'GET', headers }, res).then(() => res);
}

beforeEach(() => {
  findPendingRegistrations.mockReset().mockResolvedValue([]);
  reconcileRegistration.mockReset().mockImplementation(async (r) => ({ ...r, status: 'PAID' }));
  process.env.CRON_SECRET = SECRET;
  process.env.SITE_URL = 'https://iatmsi.example.org';
});

afterEach(() => {
  delete process.env.CRON_SECRET;
  delete process.env.SITE_URL;
});

describe('who may run it', () => {
  it('runs for the cron', async () => {
    expect((await call()).statusCode).toBe(200);
  });

  it.each([
    ['no header', NO_HEADER],
    ['the wrong secret', 'Bearer not-the-secret'],
    ['a bare secret', SECRET],
    ['an empty bearer', 'Bearer '],
  ])('refuses %s', async (_label, authorization) => {
    const res = await call({ authorization });
    expect(res.statusCode).toBe(401);
    expect(findPendingRegistrations).not.toHaveBeenCalled();
  });

  it('refuses everyone when no secret is configured', async () => {
    // Failing open here would hand anyone a button that makes the server
    // issue a burst of gateway calls.
    delete process.env.CRON_SECRET;
    const res = await call({ authorization: NO_HEADER });
    expect(res.statusCode).toBe(401);
  });
});

describe('sweeping', () => {
  it('only looks at orders old enough to have settled', async () => {
    await call();
    const { startedBefore } = findPendingRegistrations.mock.calls[0][0];
    const age = Date.now() - new Date(startedBefore).getTime();

    // Roughly fifteen minutes back, so a checkout the payer is in the middle
    // of is not interrogated.
    expect(age).toBeGreaterThan(14 * 60_000);
    expect(age).toBeLessThan(16 * 60_000);
  });

  it('counts what it confirmed', async () => {
    findPendingRegistrations.mockResolvedValue([pending(), pending(), pending()]);
    reconcileRegistration
      .mockResolvedValueOnce({ status: 'PAID' })
      .mockResolvedValueOnce({ status: 'PENDING' })
      .mockResolvedValueOnce({ status: 'PAID' });

    const res = await call();

    expect(res.payload).toMatchObject({ checked: 3, confirmed: 2, stillPending: 1 });
  });

  it('keeps going when one order cannot be reached', async () => {
    // A single unreachable order must not strand the rest of the batch.
    findPendingRegistrations.mockResolvedValue([pending(), pending(), pending()]);
    reconcileRegistration
      .mockRejectedValueOnce(new Error('gateway timeout'))
      .mockResolvedValue({ status: 'PAID' });

    const res = await call();

    expect(res.statusCode).toBe(200);
    expect(res.payload).toMatchObject({ checked: 3, confirmed: 2, failed: 1 });
  });

  it('stops chasing orders long past every retry window', async () => {
    const old = pending({ created_at: new Date(Date.now() - 30 * 24 * 60 * 60_000).toISOString() });
    findPendingRegistrations.mockResolvedValue([old, pending()]);

    const res = await call();

    expect(res.payload).toMatchObject({ abandoned: 1, confirmed: 1 });
    expect(reconcileRegistration).toHaveBeenCalledTimes(1);
  });

  it('asks for a bounded batch so one run cannot overrun its budget', async () => {
    await call();
    expect(findPendingRegistrations.mock.calls[0][0].limit).toBeLessThanOrEqual(50);
  });

  it('reports a failure to read the database rather than claiming success', async () => {
    findPendingRegistrations.mockRejectedValue(new Error('connection reset'));
    const res = await call();
    expect(res.statusCode).toBe(500);
  });
});
