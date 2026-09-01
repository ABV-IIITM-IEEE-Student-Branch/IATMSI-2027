import { describe, expect, it } from 'vitest';
import { generateOrderId, parseRegistration } from './registrationInput.js';

/**
 * This is the boundary between the public internet and the registrations
 * table. What matters is not that valid input is accepted, but that nothing
 * else gets through — and above all that no price can be smuggled in.
 */

const VALID = {
  fullName: 'Asha Ramachandran',
  email: 'Asha@Example.ORG',
  phone: '+91 98765 43210',
  category: 'student',
  region: 'indian_nepali',
  membership: 'non_ieee',
};

describe('accepting a complete registration', () => {
  it('keeps the details it was given', () => {
    const result = parseRegistration({ ...VALID, affiliation: 'IIITM Gwalior', paperId: 'TS-114' });
    expect(result.ok).toBe(true);
    expect(result.value.full_name).toBe('Asha Ramachandran');
    expect(result.value.affiliation).toBe('IIITM Gwalior');
    expect(result.value.paper_id).toBe('TS-114');
  });

  it('normalises the email so a receipt is not sent to a near-duplicate', () => {
    expect(parseRegistration(VALID).value.email).toBe('asha@example.org');
  });

  it('leaves optional fields null rather than empty strings', () => {
    const { value } = parseRegistration(VALID);
    expect(value.affiliation).toBeNull();
    expect(value.paper_id).toBeNull();
    expect(value.paper_title).toBeNull();
  });
});

describe('refusing to take a price from the browser', () => {
  it('drops amount, currency and period entirely', () => {
    // The whole point of the server-side fee table. Even named exactly like
    // the columns, these must not survive into what gets stored.
    const { value } = parseRegistration({
      ...VALID,
      amount: 1,
      currency: 'INR',
      period: 'early',
      status: 'PAID',
      order_id: 'IATMSI27-attacker',
    });
    expect(value).not.toHaveProperty('amount');
    expect(value).not.toHaveProperty('currency');
    expect(value).not.toHaveProperty('period');
    expect(value).not.toHaveProperty('status');
    expect(value).not.toHaveProperty('order_id');
  });

  it('ignores unknown fields instead of passing them to the database', () => {
    const { value } = parseRegistration({ ...VALID, cf_payment_id: 'x', paid_at: '2027-01-01' });
    expect(Object.keys(value).sort()).toEqual([
      'affiliation', 'category', 'country', 'email', 'full_name',
      'ieee_number', 'membership', 'paper_id', 'paper_title', 'phone', 'region',
    ]);
  });
});

describe('rejecting bad input', () => {
  it.each([
    ['no body', null],
    ['a missing name', { ...VALID, fullName: '' }],
    ['a one-letter name', { ...VALID, fullName: 'A' }],
    ['an address with no @', { ...VALID, email: 'asha.example.org' }],
    ['an address with no domain', { ...VALID, email: 'asha@' }],
    ['a too-short phone number', { ...VALID, phone: '12345' }],
    ['an unpriced category', { ...VALID, category: 'keynote_speaker' }],
    ['an unknown region', { ...VALID, region: 'antarctica' }],
    ['an unknown membership', { ...VALID, membership: 'lifetime' }],
  ])('rejects %s', (_label, body) => {
    expect(parseRegistration(body).ok).toBe(false);
  });

  it('will not hand out the member rate without a membership number', () => {
    // The IEEE rate is the cheaper one, so claiming it has to cost something.
    expect(parseRegistration({ ...VALID, membership: 'ieee' }).ok).toBe(false);
    expect(parseRegistration({ ...VALID, membership: 'ieee', ieeeNumber: '9' }).ok).toBe(false);

    const accepted = parseRegistration({ ...VALID, membership: 'ieee', ieeeNumber: '90210347' });
    expect(accepted.ok).toBe(true);
    expect(accepted.value.ieee_number).toBe('90210347');
  });

  it('does not keep a membership number that was not claimed', () => {
    const { value } = parseRegistration({ ...VALID, membership: 'non_ieee', ieeeNumber: '90210347' });
    expect(value.ieee_number).toBeNull();
  });

  it('truncates rather than storing an unbounded paper title', () => {
    const { value } = parseRegistration({ ...VALID, paperTitle: 'x'.repeat(5000) });
    expect(value.paper_title).toHaveLength(300);
  });
});

describe('order ids', () => {
  it('are unguessable, not sequential', () => {
    // The receipt page is reachable by whoever holds the id, so a predictable
    // one would let anyone read other registrants' names and addresses.
    const ids = new Set(Array.from({ length: 500 }, generateOrderId));
    expect(ids.size).toBe(500);

    const id = generateOrderId();
    expect(id).toMatch(/^IATMSI27-[0-9a-f]{24}$/);
  });
});
