import crypto from 'crypto';
import { Readable } from 'stream';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * The webhook handler.
 *
 * `_lib/webhook.test.js` covers the signature maths. This covers what the
 * endpoint does with the result: that an unsigned delivery touches nothing,
 * that a retry doesn't produce a second receipt, and that a payment for the
 * wrong amount never confirms a registration.
 */

const findRegistration = vi.fn();
const recordPaymentAttempt = vi.fn();
const updateRegistration = vi.fn();
const claimReceiptSend = vi.fn();
const releaseReceiptClaim = vi.fn();
const sendMail = vi.fn();
const isMailerConfigured = vi.fn();

vi.mock('./_lib/db.js', () => ({
  findRegistration: (...a) => findRegistration(...a),
  recordPaymentAttempt: (...a) => recordPaymentAttempt(...a),
  updateRegistration: (...a) => updateRegistration(...a),
  claimReceiptSend: (...a) => claimReceiptSend(...a),
  releaseReceiptClaim: (...a) => releaseReceiptClaim(...a),
  supabaseCredentials: () => ({ url: 'https://p.supabase.co', key: 'k' }),
}));

vi.mock('./_lib/mailer.js', () => ({
  sendMail: (...a) => sendMail(...a),
  isMailerConfigured: (...a) => isMailerConfigured(...a),
  mailerCredentials: () => ({ user: 'u', pass: 'p' }),
}));

const { default: handler } = await import('./webhook.js');

const SECRET = 'test_secret_key';
const TIMESTAMP = '1758000000';

const REGISTRATION = {
  order_id: 'IATMSI27-aabbccddeeff001122334455',
  full_name: 'Asha Ramachandran',
  email: 'asha@example.org',
  category: 'student',
  region: 'indian_nepali',
  membership: 'non_ieee',
  period: 'early',
  currency: 'INR',
  amount: 7500,
  status: 'PENDING',
};

function event({ status = 'SUCCESS', amount = 7500, currency = 'INR', paymentId = '5114912' } = {}) {
  return {
    data: {
      order: { order_id: REGISTRATION.order_id },
      payment: {
        cf_payment_id: paymentId,
        payment_status: status,
        payment_amount: amount,
        payment_currency: currency,
        payment_group: 'upi',
        payment_time: '2026-11-02T10:15:00+05:30',
      },
    },
  };
}

/** Posts a body to the handler, signed unless told otherwise. */
function deliver(payload, { signature, timestamp = TIMESTAMP, method = 'POST' } = {}) {
  const rawBody = typeof payload === 'string' ? payload : JSON.stringify(payload);
  const sig =
    signature === undefined
      ? crypto.createHmac('sha256', SECRET).update(timestamp + rawBody).digest('base64')
      : signature;

  const req = Object.assign(Readable.from([rawBody]), {
    method,
    headers: {
      host: 'localhost:5173',
      'x-webhook-signature': sig,
      'x-webhook-timestamp': timestamp,
    },
  });

  const res = {
    statusCode: 0,
    payload: undefined,
    setHeader() {},
    status(code) { this.statusCode = code; return this; },
    json(body) { this.payload = body; return this; },
  };

  return handler(req, res).then(() => res);
}

beforeEach(() => {
  findRegistration.mockReset().mockResolvedValue({ ...REGISTRATION });
  recordPaymentAttempt.mockReset().mockResolvedValue({});
  updateRegistration.mockReset().mockResolvedValue({ ...REGISTRATION, status: 'PAID' });
  claimReceiptSend.mockReset().mockResolvedValue(true);
  releaseReceiptClaim.mockReset().mockResolvedValue(undefined);
  sendMail.mockReset().mockResolvedValue({});
  isMailerConfigured.mockReset().mockReturnValue(true);

  process.env.CASHFREE_CLIENT_SECRET = SECRET;
  process.env.SITE_URL = 'https://iatmsi.example.org';
});

afterEach(() => {
  delete process.env.CASHFREE_CLIENT_SECRET;
  delete process.env.SITE_URL;
});

describe('confirming a genuine payment', () => {
  it('marks the registration paid and emails the receipt', async () => {
    const res = await deliver(event());

    expect(res.statusCode).toBe(200);
    expect(updateRegistration).toHaveBeenCalledWith(
      REGISTRATION.order_id,
      expect.objectContaining({ status: 'PAID', cf_payment_id: '5114912' }),
    );
    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(sendMail.mock.calls[0][0].to).toBe('asha@example.org');
  });

  it('records the payment before anything depends on it', async () => {
    await deliver(event());
    expect(recordPaymentAttempt).toHaveBeenCalledWith(
      expect.objectContaining({
        order_id: REGISTRATION.order_id,
        cf_payment_id: '5114912',
        payment_status: 'SUCCESS',
      }),
    );
  });

  it('puts the receipt link on our own domain, not the request Host', async () => {
    await deliver(event());
    expect(sendMail.mock.calls[0][0].html).toContain('https://iatmsi.example.org/registration/payment');
  });
});

describe('rejecting forged deliveries', () => {
  it('refuses an invalid signature without reading or writing anything', async () => {
    const res = await deliver(event(), { signature: 'ZmFrZSBzaWduYXR1cmUgaGVyZQ==' });

    expect(res.statusCode).toBe(401);
    expect(findRegistration).not.toHaveBeenCalled();
    expect(updateRegistration).not.toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('refuses a payload edited after signing', async () => {
    // Take a real FAILED notification and rewrite it as a success.
    const original = JSON.stringify(event({ status: 'FAILED' }));
    const signature = crypto.createHmac('sha256', SECRET).update(TIMESTAMP + original).digest('base64');

    const res = await deliver(original.replace('FAILED', 'SUCCESS'), { signature });

    expect(res.statusCode).toBe(401);
    expect(updateRegistration).not.toHaveBeenCalled();
  });

  it('refuses a delivery with no signature at all', async () => {
    const res = await deliver(event(), { signature: '' });
    expect(res.statusCode).toBe(401);
    expect(findRegistration).not.toHaveBeenCalled();
  });

  it('refuses anything but a POST', async () => {
    const res = await deliver(event(), { method: 'GET' });
    expect(res.statusCode).toBe(405);
  });
});

describe('refusing to confirm the wrong amount', () => {
  it('does not confirm a registration paid short', async () => {
    // The failure this exists to catch: an order somehow settled for less
    // than the fee table says it costs.
    const res = await deliver(event({ amount: 1 }));

    expect(res.statusCode).toBe(200);
    expect(updateRegistration).not.toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('does not confirm a payment in the wrong currency', async () => {
    // 7500 dollars would be fine; 7500 rupees charged as dollars is not the
    // same transaction, and equality on the number alone would accept it.
    await deliver(event({ currency: 'USD' }));
    expect(updateRegistration).not.toHaveBeenCalled();
  });

  it('accepts the exact amount', async () => {
    await deliver(event({ amount: 7500 }));
    expect(updateRegistration).toHaveBeenCalled();
  });
});

describe('unsuccessful payments', () => {
  it('marks a failed attempt without sending a receipt', async () => {
    const res = await deliver(event({ status: 'FAILED' }));

    expect(res.statusCode).toBe(200);
    expect(updateRegistration).toHaveBeenCalledWith(REGISTRATION.order_id, { status: 'FAILED' });
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('does not undo a confirmed registration', async () => {
    // A late FAILED for an earlier attempt must not revoke a paid one.
    findRegistration.mockResolvedValue({ ...REGISTRATION, status: 'PAID' });

    await deliver(event({ status: 'USER_DROPPED' }));

    expect(updateRegistration).not.toHaveBeenCalled();
  });
});

describe('surviving retries', () => {
  it('sends one receipt however many times the same event arrives', async () => {
    // Only the first caller wins the claim; the rest are told it is taken.
    claimReceiptSend.mockResolvedValueOnce(true).mockResolvedValue(false);

    await deliver(event());
    await deliver(event());
    await deliver(event());

    expect(sendMail).toHaveBeenCalledTimes(1);
  });

  it('lets a later attempt retry when the email itself failed', async () => {
    // A dropped SMTP connection must not cost the registrant their receipt.
    sendMail.mockRejectedValueOnce(new Error('smtp timeout'));

    await deliver(event());

    expect(releaseReceiptClaim).toHaveBeenCalledWith(REGISTRATION.order_id);
  });

  it('still returns 200 when a receipt cannot be sent', async () => {
    // The payment is real and recorded. Asking Cashfree to redeliver would not
    // fix the mail server.
    sendMail.mockRejectedValue(new Error('smtp down'));
    const res = await deliver(event());
    expect(res.statusCode).toBe(200);
  });

  it('asks for redelivery when the database is unreachable', async () => {
    // This one is worth retrying: the payment happened and we failed to
    // record it.
    updateRegistration.mockRejectedValue(new Error('connection reset'));
    const res = await deliver(event());
    expect(res.statusCode).toBe(500);
  });
});

describe('payloads that are not a payment', () => {
  it('acknowledges the dashboard test ping', async () => {
    const res = await deliver({ type: 'WEBHOOK', data: {} });
    expect(res.statusCode).toBe(200);
    expect(findRegistration).not.toHaveBeenCalled();
  });

  it('acknowledges an unknown order rather than looping on it', async () => {
    findRegistration.mockResolvedValue(null);
    const res = await deliver(event());
    expect(res.statusCode).toBe(200);
    expect(updateRegistration).not.toHaveBeenCalled();
  });

  it('rejects a body that is not JSON', async () => {
    const res = await deliver('not json at all');
    expect(res.statusCode).toBe(400);
  });
});
