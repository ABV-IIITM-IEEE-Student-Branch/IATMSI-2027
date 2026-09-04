import { claimReceiptSend, releaseReceiptClaim } from './db.js';
import { receiptEmail, toReceipt } from './receipt.js';
import { isMailerConfigured, sendMail } from './mailer.js';

export const CONFERENCE_NAME = 'IEEE IATMSI-2027';

/**
 * A backstop above the SMTP timeouts in `mailer.js`.
 *
 * Those cover a mail server that is slow or unreachable. This covers the case
 * they cannot: a send that hangs somewhere else entirely and would otherwise
 * run out the whole function. Either way the claim below gets released, which
 * is the part that matters — a claim left set with no email sent means the
 * registrant never gets a receipt and no retry will ever produce one.
 */
const SEND_DEADLINE_MS = 12000;

function withDeadline(promise, ms) {
  let timer;
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error(`Receipt send exceeded ${ms}ms`)), ms);
    }),
  ]).finally(() => clearTimeout(timer));
}

export function receiptUrlFor(origin, orderId) {
  return `${origin}/registration/payment?order_id=${encodeURIComponent(orderId)}`;
}

/**
 * Sends the receipt, at most once per registration.
 *
 * Shared by the webhook and by the status page, because either can be the
 * first to learn a payment succeeded — the webhook usually, the status page
 * when a delivery was missed.
 *
 * The claim is taken in the database before the mail is sent, so two callers
 * arriving at the same moment cannot both decide they are the one to send it.
 * If the send then fails the claim is released so a later attempt can retry: a
 * receipt that arrives twice is a nuisance, one that never arrives is a
 * support ticket.
 */
export async function sendReceiptOnce(registration, origin) {
  if (!isMailerConfigured()) return false;

  const claimed = await claimReceiptSend(registration.order_id);
  if (!claimed) return false;

  const receipt = toReceipt(registration);

  try {
    const mail = receiptEmail(receipt, {
      conferenceName: CONFERENCE_NAME,
      receiptUrl: receiptUrlFor(origin, registration.order_id),
    });
    await withDeadline(sendMail({ to: receipt.email, ...mail }), SEND_DEADLINE_MS);
    return true;
  } catch (error) {
    console.error(`[receipt] email failed for ${registration.order_id}`, error);
    await releaseReceiptClaim(registration.order_id).catch(() => {});
    return false;
  }
}
