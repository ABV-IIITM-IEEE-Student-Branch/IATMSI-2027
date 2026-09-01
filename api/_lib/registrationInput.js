import crypto from 'crypto';
import { CATEGORIES, MEMBERSHIPS, REGIONS } from './fees.js';

/**
 * Validation for what the registration form sends.
 *
 * Deliberately narrow. Anything not listed here is dropped rather than stored:
 * the request is a public endpoint, and columns should only ever be filled by
 * fields we asked for.
 *
 * Note there is no `amount`, `currency` or `period` — those are worked out by
 * `fees.js` from the three selections below and never read from the request.
 */

const LIMITS = {
  fullName: 100,
  email: 150,
  phone: 20,
  affiliation: 150,
  country: 80,
  ieeeNumber: 40,
  paperId: 40,
  paperTitle: 300,
};

// Deliberately loose: the job here is to reject obvious nonsense, not to
// adjudicate the email RFC. Whether the address works is settled by the
// receipt either arriving or bouncing.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value, max) {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/\s+/g, ' ').slice(0, max);
}

/**
 * Builds an order id nobody can guess.
 *
 * The receipt page is opened with just this id, so it doubles as the capability
 * to view that registration. A sequential or timestamped id would let anyone
 * walk the list and read other people's names and email addresses.
 */
export function generateOrderId() {
  return `IATMSI27-${crypto.randomBytes(12).toString('hex')}`;
}

/**
 * @returns {{ok: true, value: object} | {ok: false, error: string}}
 */
export function parseRegistration(body) {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Registration details are missing.' };
  }

  const fullName = clean(body.fullName, LIMITS.fullName);
  if (fullName.length < 2) {
    return { ok: false, error: 'Please enter your full name.' };
  }

  const email = clean(body.email, LIMITS.email).toLowerCase();
  if (!EMAIL.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }

  const phone = clean(body.phone, LIMITS.phone);
  const phoneDigits = phone.replace(/[^\d]/g, '');
  if (phoneDigits.length < 8 || phoneDigits.length > 15) {
    return { ok: false, error: 'Please enter a valid phone number.' };
  }

  const { category, region, membership } = body;
  if (!CATEGORIES.includes(category)) {
    return { ok: false, error: 'Please choose a registration category.' };
  }
  if (!REGIONS.includes(region)) {
    return { ok: false, error: 'Please choose whether you are registering from India/Nepal or elsewhere.' };
  }
  if (!MEMBERSHIPS.includes(membership)) {
    return { ok: false, error: 'Please choose your IEEE membership status.' };
  }

  const ieeeNumber = clean(body.ieeeNumber, LIMITS.ieeeNumber);
  // The member rate is cheaper, so it has to be claimed with a number. The
  // number itself is verified by the organisers against IEEE's records before
  // the badge is issued; this only stops the discount being taken silently.
  if (membership === 'ieee' && ieeeNumber.length < 4) {
    return { ok: false, error: 'An IEEE membership number is required for the IEEE member rate.' };
  }

  return {
    ok: true,
    value: {
      full_name: fullName,
      email,
      phone,
      affiliation: clean(body.affiliation, LIMITS.affiliation) || null,
      country: clean(body.country, LIMITS.country) || null,
      category,
      region,
      membership,
      ieee_number: membership === 'ieee' ? ieeeNumber : null,
      paper_id: clean(body.paperId, LIMITS.paperId) || null,
      paper_title: clean(body.paperTitle, LIMITS.paperTitle) || null,
    },
  };
}
