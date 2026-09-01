import { describe, expect, it } from 'vitest';
import { formatAmount, receiptEmail, toReceipt } from './receipt.js';
import { parseRegistration } from './registrationInput.js';

/**
 * The receipt.
 *
 * It is built from registrant-supplied text and sent as HTML email, so the
 * escaping is load-bearing. It also decides what leaves the server: everything
 * on it is visible to whoever holds the order id.
 */

const ROW = {
  order_id: 'IATMSI27-aabbccddeeff001122334455',
  status: 'PAID',
  full_name: 'Asha Ramachandran',
  email: 'asha@example.org',
  affiliation: 'ABV-IIITM Gwalior',
  country: 'India',
  category: 'student',
  region: 'indian_nepali',
  membership: 'ieee',
  ieee_number: '90210347',
  paper_id: 'TS-114',
  paper_title: 'Edge Inference for Low-Power Sensor Networks',
  period: 'early',
  currency: 'INR',
  amount: 6400,
  cf_payment_id: '5114912',
  paid_at: '2026-11-02T10:15:00+05:30',
  created_at: '2026-11-02T10:12:00+05:30',
  payer_country: 'US',
};

const OPTIONS = { conferenceName: 'IEEE IATMSI-2027', receiptUrl: 'https://iatmsi.example.org/r' };

describe('what a receipt exposes', () => {
  it('carries only fields meant for the payer', () => {
    const receipt = toReceipt(ROW);
    expect(Object.keys(receipt).sort()).toEqual([
      'affiliation', 'amount', 'amountLabel', 'category', 'categoryLabel', 'country',
      'createdAt', 'currency', 'email', 'fullName', 'ieeeNumber', 'membershipLabel',
      'orderId', 'paidAt', 'paperId', 'paperTitle', 'paymentId', 'periodLabel',
      'regionLabel', 'status',
    ]);
  });

  it('does not carry the country recorded for the organisers', () => {
    // payer_country exists so staff can spot rate-shopping. Reflecting it back
    // would tell the payer exactly what is being checked.
    expect(toReceipt(ROW)).not.toHaveProperty('payerCountry');
    expect(JSON.stringify(toReceipt(ROW))).not.toContain('payer_country');
  });

  it('states the stored amount rather than recomputing one', () => {
    // If a fee ever changes, an old receipt must still say what was actually
    // charged at the time.
    expect(toReceipt({ ...ROW, amount: 1234 }).amountLabel).toBe('₹1,234.00');
  });

  it('formats each currency with its own symbol', () => {
    expect(formatAmount(6400, 'INR')).toBe('₹6,400.00');
    expect(formatAmount(150, 'USD')).toBe('$150.00');
  });

  it('reads an amount that arrived from Postgres as a string', () => {
    expect(formatAmount('6400.00', 'INR')).toBe('₹6,400.00');
  });
});

describe('escaping registrant text in the email', () => {
  const NASTY = '<script>alert(1)</script>';

  it('escapes a name that contains markup', () => {
    const { html } = receiptEmail(toReceipt({ ...ROW, full_name: NASTY }), OPTIONS);

    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('escapes every registrant-supplied field, not just the name', () => {
    const receipt = toReceipt({
      ...ROW,
      full_name: NASTY,
      affiliation: NASTY,
      paper_title: NASTY,
      paper_id: NASTY,
      ieee_number: NASTY,
      email: NASTY,
    });
    const { html } = receiptEmail(receipt, OPTIONS);

    expect(html).not.toContain('<script>');
    expect(html.match(/&lt;script&gt;/g).length).toBeGreaterThanOrEqual(6);
  });

  it('escapes quotes, so a value cannot break out of an attribute', () => {
    const { html } = receiptEmail(
      toReceipt({ ...ROW, full_name: 'a" onload="alert(1)' }),
      OPTIONS,
    );
    expect(html).not.toContain('onload="alert(1)"');
    expect(html).toContain('&quot;');
  });

  it('escapes ampersands without double-escaping', () => {
    const { html } = receiptEmail(toReceipt({ ...ROW, affiliation: 'Tom & Jerry Institute' }), OPTIONS);
    expect(html).toContain('Tom &amp; Jerry Institute');
    expect(html).not.toContain('&amp;amp;');
  });

  it('omits rows for fields the registrant left blank', () => {
    const { html } = receiptEmail(
      toReceipt({ ...ROW, paper_id: null, paper_title: null, affiliation: null }),
      OPTIONS,
    );
    expect(html).not.toContain('Paper ID');
    expect(html).not.toContain('Affiliation');
  });
});

describe('the email envelope', () => {
  it('cannot have headers injected through the address', () => {
    // The validator rejects whitespace, so a newline never reaches the
    // recipient field and no extra header can be smuggled in.
    const attempt = parseRegistration({
      fullName: 'Asha',
      email: 'asha@example.org\nBcc: everyone@example.net',
      phone: '9876543210',
      category: 'student',
      region: 'indian_nepali',
      membership: 'non_ieee',
    });
    expect(attempt.ok).toBe(false);
  });

  it('cannot have headers injected through the name', () => {
    // The name reaches the subject line only indirectly, but it is collapsed
    // to single spaces on the way in regardless.
    const parsed = parseRegistration({
      fullName: 'Asha\r\nBcc: everyone@example.net',
      email: 'asha@example.org',
      phone: '9876543210',
      category: 'student',
      region: 'indian_nepali',
      membership: 'non_ieee',
    });
    expect(parsed.ok).toBe(true);
    expect(parsed.value.full_name).not.toMatch(/[\r\n]/);
  });

  it('puts the order id in the subject so replies can be traced', () => {
    const { subject } = receiptEmail(toReceipt(ROW), OPTIONS);
    expect(subject).toContain(ROW.order_id);
  });

  it('offers a plain-text alternative as well as HTML', () => {
    // Some mail clients show only the text part; a receipt that renders as a
    // blank message is a support ticket.
    const { text, html } = receiptEmail(toReceipt(ROW), OPTIONS);
    expect(text).toContain(ROW.order_id);
    expect(text).toContain('6,400.00');
    expect(html).toContain('6,400.00');
  });
});
