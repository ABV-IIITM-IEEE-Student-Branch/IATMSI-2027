import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * The status endpoint.
 *
 * The order id is the only credential involved — whoever holds it sees the
 * registrant's name, email and affiliation. So what matters is that it is
 * genuinely unguessable, that a wrong one yields nothing, and that this path
 * confirms a payment on the same terms as the webhook.
 */

const findRegistration = vi.fn();
const reconcileRegistration = vi.fn();

vi.mock('./_lib/db.js', () => ({
  findRegistration: (...a) => findRegistration(...a),
  supabaseCredentials: () => ({ url: 'https://p.supabase.co', key: 'k' }),
}));

vi.mock('./_lib/cashfree.js', () => ({
  cashfreeCredentials: () => ({ clientId: 'i', clientSecret: 's' }),
}));

vi.mock('./_lib/reconcile.js', () => ({
  reconcileRegistration: (...a) => reconcileRegistration(...a),
}));

const checkRateLimit = vi.fn();
vi.mock('./_lib/rateLimit.js', () => ({
  checkRateLimit: (...a) => checkRateLimit(...a),
}));

const { default: handler } = await import('./payment-status.js');

const ORDER_ID = 'IATMSI27-aabbccddeeff001122334455';

const ROW = {
  order_id: ORDER_ID,
  status: 'PAID',
  full_name: 'Asha Ramachandran',
  email: 'asha@example.org',
  category: 'student',
  region: 'indian_nepali',
  membership: 'non_ieee',
  period: 'early',
  currency: 'INR',
  amount: 7500,
  cf_payment_id: '5114912',
  paid_at: '2026-11-02T10:15:00+05:30',
  payer_country: 'US',
};

function call(orderId, method = 'GET') {
  const res = {
    statusCode: 0,
    payload: undefined,
    headers: {},
    setHeader(k, v) { this.headers[k] = v; },
    status(c) { this.statusCode = c; return this; },
    json(p) { this.payload = p; return this; },
  };
  return handler({ method, query: { order_id: orderId }, headers: { host: 'x' } }, res).then(() => res);
}

beforeEach(() => {
  findRegistration.mockReset().mockResolvedValue({ ...ROW });
  reconcileRegistration.mockReset().mockImplementation(async (r) => r);
  checkRateLimit.mockReset().mockResolvedValue({ allowed: true, remaining: 29 });
  process.env.SITE_URL = 'https://iatmsi.example.org';
});

afterEach(() => {
  delete process.env.SITE_URL;
});

describe('returning a receipt', () => {
  it('returns one for a known order', async () => {
    const res = await call(ORDER_ID);
    expect(res.statusCode).toBe(200);
    expect(res.payload.receipt.orderId).toBe(ORDER_ID);
    expect(res.payload.receipt.amountLabel).toBe('₹7,500.00');
  });

  it('is never cached', async () => {
    // A cached receipt could be served to the next person on a shared proxy.
    const res = await call(ORDER_ID);
    expect(res.headers['Cache-Control']).toBe('no-store');
  });

  it('does not expose internal fields to the payer', async () => {
    // payer_country is evidence for the organisers, not something to show
    // back to the person whose location it records.
    const res = await call(ORDER_ID);
    expect(JSON.stringify(res.payload)).not.toContain('payer_country');
    expect(res.payload.receipt).not.toHaveProperty('payer_country');
  });
});

describe('rejecting anything that is not an order id we issued', () => {
  it.each([
    ['nothing', ''],
    ['a plain word', 'test'],
    ['the right prefix but wrong length', 'IATMSI27-aabb'],
    ['non-hex characters', 'IATMSI27-zzzzzzzzzzzzzzzzzzzzzzzz'],
    ['a PostgREST filter', 'IATMSI27-aabbccddeeff001122334455&status=eq.PAID'],
    ['a wildcard', '*'],
    ['an operator', 'eq.PAID'],
  ])('rejects %s before touching the database', async (_label, orderId) => {
    const res = await call(orderId);
    expect(res.statusCode).toBe(400);
    expect(findRegistration).not.toHaveBeenCalled();
  });

  it('rejects anything but a GET', async () => {
    expect((await call(ORDER_ID, 'POST')).statusCode).toBe(405);
  });

  it('says the same thing for an unknown order as a malformed one would learn', async () => {
    // With 96 bits of entropy these cannot be enumerated, and the response
    // carries nothing that would help try.
    findRegistration.mockResolvedValue(null);
    const res = await call(ORDER_ID);
    expect(res.statusCode).toBe(404);
    expect(JSON.stringify(res.payload)).not.toContain(ORDER_ID);
  });
});

describe('catching up when a webhook was missed', () => {
  it('asks Cashfree directly while a registration is pending', async () => {
    findRegistration.mockResolvedValue({ ...ROW, status: 'PENDING' });
    reconcileRegistration.mockResolvedValue({ ...ROW, status: 'PAID' });

    const res = await call(ORDER_ID);

    expect(reconcileRegistration).toHaveBeenCalled();
    expect(res.payload.receipt.status).toBe('PAID');
  });

  it('does not re-check an order already settled', async () => {
    await call(ORDER_ID);
    expect(reconcileRegistration).not.toHaveBeenCalled();
  });

  it('re-checks a FAILED registration too', async () => {
    // A failed attempt is not a final answer. Cashfree lets a payer retry
    // within the same order, so a row marked failed on attempt one may have
    // been paid on attempt two — and if that webhook was lost, this is the
    // only place they find out. Telling someone their payment failed while
    // the money has left their account is the worst answer available.
    findRegistration.mockResolvedValue({ ...ROW, status: 'FAILED' });
    reconcileRegistration.mockResolvedValue({ ...ROW, status: 'PAID' });

    const res = await call(ORDER_ID);

    expect(reconcileRegistration).toHaveBeenCalled();
    expect(res.payload.receipt.status).toBe('PAID');
  });

  it('stops asking the gateway when a caller polls too hard', async () => {
    // Each re-check is two gateway calls and the page polls while a payment
    // settles, so an order id becomes a lever for burning API quota.
    findRegistration.mockResolvedValue({ ...ROW, status: 'PENDING' });
    checkRateLimit.mockResolvedValue({ allowed: false, remaining: 0 });

    const res = await call(ORDER_ID);

    expect(reconcileRegistration).not.toHaveBeenCalled();
    // Still answered, with what we know. Refusing the page outright would
    // leave a payer who has just paid staring at an error.
    expect(res.statusCode).toBe(200);
    expect(res.payload.receipt.status).toBe('PENDING');
  });

  it('never spends the allowance on an order already paid', async () => {
    await call(ORDER_ID);
    expect(checkRateLimit).not.toHaveBeenCalled();
  });

  it('reports an error rather than a false "not paid"', async () => {
    // Telling someone their payment failed when we simply could not check is
    // worse than admitting the check failed.
    findRegistration.mockRejectedValue(new Error('connection reset'));
    const res = await call(ORDER_ID);
    expect(res.statusCode).toBe(500);
  });
});
