import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * The order-creation endpoint, end to end with the gateway and database
 * stubbed out.
 *
 * The property under test is the one the whole design rests on: whatever the
 * request says, the amount sent to Cashfree comes from the fee table. The unit
 * tests prove `calculateFee` is right; these prove nothing downstream quietly
 * takes a price from the browser instead.
 */

const createOrder = vi.fn();
const insertRegistration = vi.fn();

vi.mock('./_lib/cashfree.js', async (importOriginal) => ({
  ...(await importOriginal()),
  createOrder: (...args) => createOrder(...args),
}));

vi.mock('./_lib/db.js', async (importOriginal) => ({
  ...(await importOriginal()),
  insertRegistration: (...args) => insertRegistration(...args),
}));

const { default: handler } = await import('./create-order.js');
const { getPeriod } = await import('./_lib/fees.js');

const VALID = {
  fullName: 'Asha Ramachandran',
  email: 'asha@example.org',
  phone: '+91 98765 43210',
  category: 'student',
  region: 'indian_nepali',
  membership: 'non_ieee',
};

function call(body, method = 'POST') {
  const res = {
    statusCode: 0,
    payload: undefined,
    headers: {},
    setHeader(key, value) { this.headers[key] = value; },
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.payload = payload; return this; },
  };
  return handler({ method, body, headers: { host: 'localhost:5173' } }, res).then(() => res);
}

beforeEach(() => {
  createOrder.mockReset().mockResolvedValue({ orderId: 'x', paymentSessionId: 'session_abc' });
  insertRegistration.mockReset().mockResolvedValue({});

  process.env.CASHFREE_CLIENT_ID = 'test_id';
  process.env.CASHFREE_CLIENT_SECRET = 'test_secret';
  process.env.SUPABASE_URL = 'https://project.supabase.co';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'test_service_key';
  process.env.SITE_URL = 'https://iatmsi.example.org';
});

afterEach(() => {
  for (const key of [
    'CASHFREE_CLIENT_ID', 'CASHFREE_CLIENT_SECRET',
    'SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'SITE_URL', 'CASHFREE_MODE',
  ]) {
    delete process.env[key];
  }
});

describe('the price comes from the server, not the request', () => {
  it('charges the published fee for the selections made', () => {
    return call(VALID).then((res) => {
      expect(res.statusCode).toBe(200);
      // Student / India / non-IEEE. Early-bird until Feb 2027; either way it
      // must be one of the two published numbers and never anything else.
      expect([7500, 8500]).toContain(createOrder.mock.calls[0][0].amount);
      expect(createOrder.mock.calls[0][0].currency).toBe('INR');
    });
  });

  it('ignores an amount supplied by the caller', async () => {
    // The attack: post the form with the price changed to 1.
    const res = await call({ ...VALID, amount: 1, order_amount: 1, currency: 'INR' });

    expect(res.statusCode).toBe(200);
    expect(createOrder.mock.calls[0][0].amount).not.toBe(1);
    expect([7500, 8500]).toContain(createOrder.mock.calls[0][0].amount);
  });

  it('ignores a currency supplied by the caller', async () => {
    // Paying 7500 in dollars instead of rupees would be a 90% discount.
    await call({ ...VALID, currency: 'USD' });
    expect(createOrder.mock.calls[0][0].currency).toBe('INR');
  });

  it('ignores a period supplied by the caller', async () => {
    // Claiming a period must not move the price. Whichever side of the cutoff
    // today falls on, both of these have to land on the same one — the one the
    // server's own clock says.
    await call({ ...VALID, period: 'early' });
    const claimedEarly = insertRegistration.mock.calls[0][0];

    insertRegistration.mockClear();
    await call({ ...VALID, period: 'regular' });
    const claimedRegular = insertRegistration.mock.calls[0][0];

    expect(claimedEarly.period).toBe(getPeriod());
    expect(claimedRegular.period).toBe(getPeriod());
    expect(claimedEarly.amount).toBe(claimedRegular.amount);
  });

  it('stores the same amount it asks the gateway to charge', async () => {
    // The webhook later compares what was paid against the stored amount, so
    // these two drifting apart would silently disable that check.
    await call(VALID);
    expect(insertRegistration.mock.calls[0][0].amount).toBe(createOrder.mock.calls[0][0].amount);
    expect(insertRegistration.mock.calls[0][0].currency).toBe(createOrder.mock.calls[0][0].currency);
  });

  it('gives IEEE members the member rate and no one else', async () => {
    await call({ ...VALID, membership: 'ieee', ieeeNumber: '90210347' });
    const memberAmount = createOrder.mock.calls[0][0].amount;

    createOrder.mockClear();
    await call(VALID);
    const nonMemberAmount = createOrder.mock.calls[0][0].amount;

    expect(memberAmount).toBeLessThan(nonMemberAmount);
  });
});

describe('order ids', () => {
  it('generates its own and ignores one from the caller', async () => {
    const res = await call({ ...VALID, orderId: 'chosen-by-attacker', order_id: 'chosen-by-attacker' });

    expect(res.payload.orderId).toMatch(/^IATMSI27-[0-9a-f]{24}$/);
    expect(createOrder.mock.calls[0][0].orderId).toBe(res.payload.orderId);
  });

  it('never reuses one', async () => {
    const first = await call(VALID);
    const second = await call(VALID);
    expect(first.payload.orderId).not.toBe(second.payload.orderId);
  });
});

describe('the URLs handed to the gateway', () => {
  it('builds them from configuration, not the Host header', async () => {
    // A caller controls Host. If the notify URL came from it, an attacker
    // could have the payment webhook delivered to a server of their choosing.
    const res = {
      statusCode: 0, payload: undefined,
      setHeader() {}, status(c) { this.statusCode = c; return this; },
      json(p) { this.payload = p; return this; },
    };
    await handler(
      { method: 'POST', body: VALID, headers: { host: 'attacker.example.com' } },
      res,
    );

    const { returnUrl, notifyUrl } = createOrder.mock.calls[0][0];
    expect(notifyUrl).toBe('https://iatmsi.example.org/api/webhook');
    expect(returnUrl.startsWith('https://iatmsi.example.org/registration/payment?order_id=')).toBe(true);
    expect(notifyUrl).not.toContain('attacker.example.com');
    expect(returnUrl).not.toContain('attacker.example.com');
  });
});

describe('refusing bad requests', () => {
  it.each([
    ['an unpriced category', { ...VALID, category: 'complimentary' }],
    ['an unknown region', { ...VALID, region: 'atlantis' }],
    ['a malformed email', { ...VALID, email: 'not-an-address' }],
    ['a missing name', { ...VALID, fullName: '' }],
    ['the member rate without a number', { ...VALID, membership: 'ieee' }],
  ])('rejects %s without opening an order', async (_label, body) => {
    const res = await call(body);
    expect(res.statusCode).toBe(400);
    expect(createOrder).not.toHaveBeenCalled();
    expect(insertRegistration).not.toHaveBeenCalled();
  });

  it('rejects a GET', async () => {
    const res = await call(undefined, 'GET');
    expect(res.statusCode).toBe(405);
    expect(createOrder).not.toHaveBeenCalled();
  });

  it('reports missing configuration by name only, never by value', async () => {
    process.env.CASHFREE_CLIENT_SECRET = 'super-secret-value';
    delete process.env.SUPABASE_URL;

    const res = await call(VALID);

    expect(res.statusCode).toBe(503);
    expect(res.payload.missing).toContain('SUPABASE_URL');
    expect(JSON.stringify(res.payload)).not.toContain('super-secret-value');
  });

  it('does not leak the gateway error to the payer', async () => {
    createOrder.mockRejectedValue(new Error('x-client-secret rejected: cf_test_9f3a'));

    const res = await call(VALID);

    expect(res.statusCode).toBe(502);
    expect(JSON.stringify(res.payload)).not.toContain('cf_test_9f3a');
  });
});

describe('what comes back to the browser', () => {
  it('returns a session id, not anything that could be edited into a price', async () => {
    const res = await call(VALID);

    expect(res.payload.paymentSessionId).toBe('session_abc');
    // The amount is echoed for display. It is never read back in: the order at
    // Cashfree is already fixed at the amount above.
    expect(res.payload.amount).toBe(createOrder.mock.calls[0][0].amount);
    expect(res.headers['Cache-Control']).toBe('no-store');
  });

  it('defaults to sandbox unless production is set explicitly', async () => {
    expect((await call(VALID)).payload.mode).toBe('sandbox');

    process.env.CASHFREE_MODE = 'production';
    expect((await call(VALID)).payload.mode).toBe('production');
  });
});
