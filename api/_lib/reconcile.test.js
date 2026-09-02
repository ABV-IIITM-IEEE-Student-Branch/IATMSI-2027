import { describe, expect, it, vi } from 'vitest';

/**
 * Reconciliation — confirming a payment from Cashfree's own answer rather than
 * from a webhook.
 *
 * This path can mark a registration paid on its own, so it is held to the same
 * standard as the webhook: it confirms only what Cashfree confirms, and only
 * for the amount we set.
 */

const fetchOrder = vi.fn();
const fetchPayments = vi.fn();
const recordPaymentAttempt = vi.fn();
const updateRegistration = vi.fn();
const sendReceiptOnce = vi.fn();

vi.mock('./cashfree.js', () => ({
  fetchOrder: (...a) => fetchOrder(...a),
  fetchPayments: (...a) => fetchPayments(...a),
}));

vi.mock('./db.js', () => ({
  recordPaymentAttempt: (...a) => recordPaymentAttempt(...a),
  updateRegistration: (...a) => updateRegistration(...a),
}));

vi.mock('./receiptDelivery.js', () => ({
  sendReceiptOnce: (...a) => sendReceiptOnce(...a),
}));

const { amountMatches, reconcileRegistration, safeTimestamp } = await import('./reconcile.js');

const REGISTRATION = {
  order_id: 'IATMSI27-aabbccddeeff001122334455',
  email: 'asha@example.org',
  currency: 'INR',
  amount: 7500,
  status: 'PENDING',
};

function payment(overrides = {}) {
  return {
    cf_payment_id: '5114912',
    payment_status: 'SUCCESS',
    payment_amount: 7500,
    payment_currency: 'INR',
    payment_group: 'upi',
    payment_time: '2026-11-02T10:15:00+05:30',
    ...overrides,
  };
}

function setup({ orderStatus = 'PAID', payments = [payment()] } = {}) {
  fetchOrder.mockReset().mockResolvedValue({ orderStatus });
  fetchPayments.mockReset().mockResolvedValue(payments);
  recordPaymentAttempt.mockReset().mockResolvedValue({});
  updateRegistration.mockReset().mockResolvedValue({ ...REGISTRATION, status: 'PAID' });
  sendReceiptOnce.mockReset().mockResolvedValue(true);
}

describe('comparing what was paid against what was charged', () => {
  it('accepts the exact amount and currency', () => {
    expect(amountMatches(payment(), REGISTRATION)).toBe(true);
  });

  it('rejects a different amount', () => {
    expect(amountMatches(payment({ payment_amount: 1 }), REGISTRATION)).toBe(false);
    expect(amountMatches(payment({ payment_amount: 7499 }), REGISTRATION)).toBe(false);
  });

  it('rejects the same number in a different currency', () => {
    // 7,500 dollars is not 7,500 rupees. Comparing amounts alone would take
    // the cheaper one as payment for the dearer.
    expect(amountMatches(payment({ payment_currency: 'USD' }), REGISTRATION)).toBe(false);
  });

  it('rejects a missing or unparseable amount', () => {
    expect(amountMatches(payment({ payment_amount: undefined }), REGISTRATION)).toBe(false);
    expect(amountMatches(payment({ payment_amount: 'lots' }), REGISTRATION)).toBe(false);
    expect(amountMatches(payment({ payment_amount: null }), REGISTRATION)).toBe(false);
  });

  it('copes with the amount arriving as a string from either side', () => {
    // PostgREST can render `numeric` as a string, and gateways vary too.
    expect(amountMatches(payment({ payment_amount: '7500.00' }), REGISTRATION)).toBe(true);
    expect(amountMatches(payment(), { ...REGISTRATION, amount: '7500.00' })).toBe(true);
  });
});

describe('timestamps from the gateway', () => {
  it('passes through a valid time', () => {
    expect(safeTimestamp('2026-11-02T10:15:00+05:30')).toBe('2026-11-02T04:45:00.000Z');
  });

  it('substitutes now for anything unparseable', () => {
    // A value Postgres rejects would fail the update, return 500, and be
    // redelivered into the same failure forever.
    for (const bad of ['not a date', '', null, undefined, '0000-00-00']) {
      expect(() => new Date(safeTimestamp(bad)).toISOString()).not.toThrow();
    }
  });
});

describe('confirming a pending registration', () => {
  it('marks it paid when Cashfree says it was paid', async () => {
    setup();
    const result = await reconcileRegistration(REGISTRATION, 'https://x.org');

    expect(result.status).toBe('PAID');
    expect(updateRegistration).toHaveBeenCalledWith(
      REGISTRATION.order_id,
      expect.objectContaining({ status: 'PAID', cf_payment_id: '5114912' }),
    );
    expect(sendReceiptOnce).toHaveBeenCalled();
  });

  it('treats an order the gateway has never heard of as settled, not an error', async () => {
    // Order creation can fail after the row is written, leaving nothing at the
    // gateway to match it. Throwing would make the daily sweep re-ask a
    // question that already has a final answer, and log an error each time —
    // which is exactly what marking those rows FAILED was meant to avoid,
    // before FAILED rows started being swept too.
    fetchOrder.mockReset().mockResolvedValue(null);
    fetchPayments.mockReset();
    updateRegistration.mockReset();

    const result = await reconcileRegistration(REGISTRATION, 'https://x.org');

    expect(result.status).toBe('PENDING');
    expect(fetchPayments).not.toHaveBeenCalled();
    expect(updateRegistration).not.toHaveBeenCalled();
  });

  it('leaves it alone while checkout is still open', async () => {
    setup({ orderStatus: 'ACTIVE' });
    const result = await reconcileRegistration(REGISTRATION, 'https://x.org');

    expect(result.status).toBe('PENDING');
    expect(updateRegistration).not.toHaveBeenCalled();
    expect(fetchPayments).not.toHaveBeenCalled();
  });

  it.each(['EXPIRED', 'TERMINATED'])('leaves it alone when the order is %s', async (orderStatus) => {
    setup({ orderStatus });
    const result = await reconcileRegistration(REGISTRATION, 'https://x.org');
    expect(result.status).toBe('PENDING');
    expect(updateRegistration).not.toHaveBeenCalled();
  });

  it('does not confirm on a failed attempt against a paid order', async () => {
    setup({ payments: [payment({ payment_status: 'FAILED' })] });
    const result = await reconcileRegistration(REGISTRATION, 'https://x.org');

    expect(result.status).toBe('PENDING');
    expect(updateRegistration).not.toHaveBeenCalled();
  });

  it('refuses to confirm a payment for the wrong amount', async () => {
    setup({ payments: [payment({ payment_amount: 1 })] });
    const result = await reconcileRegistration(REGISTRATION, 'https://x.org');

    expect(result.status).toBe('PENDING');
    expect(updateRegistration).not.toHaveBeenCalled();
    expect(sendReceiptOnce).not.toHaveBeenCalled();
  });

  it('picks the successful attempt out of several', async () => {
    setup({
      payments: [
        payment({ payment_status: 'FAILED', cf_payment_id: '1' }),
        payment({ payment_status: 'SUCCESS', cf_payment_id: '2' }),
      ],
    });
    await reconcileRegistration(REGISTRATION, 'https://x.org');

    expect(updateRegistration).toHaveBeenCalledWith(
      REGISTRATION.order_id,
      expect.objectContaining({ cf_payment_id: '2' }),
    );
  });

  it('records the payment as well as confirming it', async () => {
    setup();
    await reconcileRegistration(REGISTRATION, 'https://x.org');

    expect(recordPaymentAttempt).toHaveBeenCalledWith(
      expect.objectContaining({ order_id: REGISTRATION.order_id, cf_payment_id: '5114912' }),
    );
  });
});
