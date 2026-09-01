import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * Receipt delivery.
 *
 * The claim taken here is the only thing preventing duplicate receipts, and
 * releasing it on failure is the only thing preventing a *missing* one. Both
 * halves need to hold, including when the send neither succeeds nor fails but
 * simply never returns.
 */

const claimReceiptSend = vi.fn();
const releaseReceiptClaim = vi.fn();
const sendMail = vi.fn();
const isMailerConfigured = vi.fn();

vi.mock('./db.js', () => ({
  claimReceiptSend: (...a) => claimReceiptSend(...a),
  releaseReceiptClaim: (...a) => releaseReceiptClaim(...a),
}));

vi.mock('./mailer.js', () => ({
  sendMail: (...a) => sendMail(...a),
  isMailerConfigured: (...a) => isMailerConfigured(...a),
}));

const { sendReceiptOnce } = await import('./receiptDelivery.js');

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
  status: 'PAID',
  cf_payment_id: '5114912',
  paid_at: '2026-11-02T10:15:00+05:30',
};

beforeEach(() => {
  vi.useRealTimers();
  claimReceiptSend.mockReset().mockResolvedValue(true);
  releaseReceiptClaim.mockReset().mockResolvedValue(undefined);
  sendMail.mockReset().mockResolvedValue({});
  isMailerConfigured.mockReset().mockReturnValue(true);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('sending exactly one receipt', () => {
  it('sends when the claim is won', async () => {
    await expect(sendReceiptOnce(REGISTRATION, 'https://iatmsi.example.org')).resolves.toBe(true);
    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(sendMail.mock.calls[0][0].to).toBe('asha@example.org');
  });

  it('sends nothing when the claim is already taken', async () => {
    claimReceiptSend.mockResolvedValue(false);
    await expect(sendReceiptOnce(REGISTRATION, 'https://x.org')).resolves.toBe(false);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('does not claim at all when mail is not configured', async () => {
    // Otherwise the claim would be spent on a send that never happens, and
    // configuring mail later would not produce the receipt.
    isMailerConfigured.mockReturnValue(false);
    await expect(sendReceiptOnce(REGISTRATION, 'https://x.org')).resolves.toBe(false);
    expect(claimReceiptSend).not.toHaveBeenCalled();
  });

  it('states the recorded amount, not a recalculated one', async () => {
    const body = sendMail.mock.calls;
    await sendReceiptOnce(REGISTRATION, 'https://x.org');
    expect(body[0][0].text).toContain('7,500.00');
    expect(body[0][0].subject).toContain(REGISTRATION.order_id);
  });
});

describe('releasing the claim so a receipt is never lost', () => {
  it('releases when the send throws', async () => {
    sendMail.mockRejectedValue(new Error('mailbox unavailable'));

    await expect(sendReceiptOnce(REGISTRATION, 'https://x.org')).resolves.toBe(false);
    expect(releaseReceiptClaim).toHaveBeenCalledWith(REGISTRATION.order_id);
  });

  it('releases when the send hangs instead of failing', async () => {
    // The failure this guards against: nodemailer's own timeouts are minutes
    // long, far past a serverless function's lifetime. Without a deadline the
    // function is killed mid-send — the catch never runs, the claim stays set,
    // and every later retry sees a receipt that was already "sent". The
    // registrant has paid and will never receive one.
    vi.useFakeTimers();
    sendMail.mockReturnValue(new Promise(() => {}));

    const pending = sendReceiptOnce(REGISTRATION, 'https://x.org');
    await vi.advanceTimersByTimeAsync(13000);

    await expect(pending).resolves.toBe(false);
    expect(releaseReceiptClaim).toHaveBeenCalledWith(REGISTRATION.order_id);
  });

  it('gives the send a deadline shorter than a function lifetime', async () => {
    // 12s against Vercel's 30s ceiling for this route. If the deadline ever
    // creeps past the function budget it stops being a deadline at all.
    vi.useFakeTimers();
    sendMail.mockReturnValue(new Promise(() => {}));

    const pending = sendReceiptOnce(REGISTRATION, 'https://x.org');
    await vi.advanceTimersByTimeAsync(29_000);

    await expect(pending).resolves.toBe(false);
    expect(releaseReceiptClaim).toHaveBeenCalled();
  });

  it('does not release a claim for a send that worked', async () => {
    await sendReceiptOnce(REGISTRATION, 'https://x.org');
    expect(releaseReceiptClaim).not.toHaveBeenCalled();
  });
});
