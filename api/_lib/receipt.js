import { CATEGORY_LABELS } from './fees.js';

/**
 * The registration receipt, in the two forms it is needed: a plain object the
 * receipt page renders, and an HTML email.
 *
 * Both are built from the stored row rather than from anything the browser
 * sent, so a receipt always states what was actually recorded and charged.
 */

const REGION_LABELS = {
  indian_nepali: 'India / Nepal',
  international: 'International',
};

const MEMBERSHIP_LABELS = {
  ieee: 'IEEE Member',
  non_ieee: 'Non-IEEE Member',
};

const PERIOD_LABELS = {
  early: 'Early Bird',
  regular: 'Regular',
};

export function formatAmount(amount, currency) {
  const value = Number(amount).toLocaleString(currency === 'INR' ? 'en-IN' : 'en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return currency === 'INR' ? `₹${value}` : `$${value}`;
}

/** The safe, public shape of a registration — everything the payer may see. */
export function toReceipt(row) {
  return {
    orderId: row.order_id,
    status: row.status,
    fullName: row.full_name,
    email: row.email,
    affiliation: row.affiliation,
    country: row.country,
    category: row.category,
    categoryLabel: CATEGORY_LABELS[row.category] || row.category,
    regionLabel: REGION_LABELS[row.region] || row.region,
    membershipLabel: MEMBERSHIP_LABELS[row.membership] || row.membership,
    periodLabel: PERIOD_LABELS[row.period] || row.period,
    ieeeNumber: row.ieee_number,
    paperId: row.paper_id,
    paperTitle: row.paper_title,
    amount: Number(row.amount),
    currency: row.currency,
    amountLabel: formatAmount(row.amount, row.currency),
    paymentId: row.cf_payment_id,
    paidAt: row.paid_at,
    createdAt: row.created_at,

    // Whether a receipt email actually went out, so the page can avoid
    // promising one that did not. `receipt_sent_at` is claimed just before the
    // send and released again if it fails, so a value here means an email was
    // sent rather than merely attempted.
    receiptEmailed: Boolean(row.receipt_sent_at),
  };
}

/**
 * Escapes text before it goes into the email.
 *
 * Registrants type their own name, affiliation and paper title. Those land in
 * an HTML email, so they are escaped rather than trusted.
 */
function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function row(label, value) {
  if (!value) return '';
  return `<tr>
      <td style="padding:8px 12px;border-bottom:1px solid #EADFC8;color:#6B5B3E;font-size:13px;">${esc(label)}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #EADFC8;color:#2F0B11;font-size:13px;font-weight:600;">${esc(value)}</td>
    </tr>`;
}

export function receiptEmail(receipt, { conferenceName, receiptUrl }) {
  const subject = `${conferenceName} — registration confirmed (${receipt.orderId})`;

  const text = [
    `Dear ${receipt.fullName},`,
    '',
    `Your registration for ${conferenceName} is confirmed.`,
    '',
    `Order ID:        ${receipt.orderId}`,
    `Payment ID:      ${receipt.paymentId || '-'}`,
    `Category:        ${receipt.categoryLabel}`,
    `Rate:            ${receipt.periodLabel}, ${receipt.membershipLabel}, ${receipt.regionLabel}`,
    `Amount paid:     ${receipt.amountLabel}`,
    receipt.paperId ? `Paper ID:        ${receipt.paperId}` : '',
    '',
    `A printable receipt is available at: ${receiptUrl}`,
    '',
    'Please keep this email for your records.',
    '',
    conferenceName,
  ]
    .filter((line) => line !== '')
    .join('\n');

  const html = `<div style="font-family:Georgia,'Times New Roman',serif;background:#FAF5EB;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:2px solid #C59B27;border-radius:14px;overflow:hidden;">
    <div style="background:#4A121A;padding:20px 24px;">
      <div style="color:#F3D98B;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Registration Receipt</div>
      <div style="color:#FAF5EB;font-size:19px;font-weight:bold;margin-top:4px;">${esc(conferenceName)}</div>
    </div>

    <div style="padding:22px 24px;">
      <p style="margin:0 0 14px;color:#2F0B11;font-size:14px;">Dear ${esc(receipt.fullName)},</p>
      <p style="margin:0 0 18px;color:#4A4034;font-size:14px;line-height:1.6;">
        Your payment has been received and your registration is confirmed.
      </p>

      <table style="width:100%;border-collapse:collapse;border:1px solid #EADFC8;border-radius:8px;">
        ${row('Order ID', receipt.orderId)}
        ${row('Payment ID', receipt.paymentId)}
        ${row('Name', receipt.fullName)}
        ${row('Email', receipt.email)}
        ${row('Affiliation', receipt.affiliation)}
        ${row('Category', receipt.categoryLabel)}
        ${row('Rate', `${receipt.periodLabel} · ${receipt.membershipLabel} · ${receipt.regionLabel}`)}
        ${row('IEEE membership no.', receipt.ieeeNumber)}
        ${row('Paper ID', receipt.paperId)}
        ${row('Paper title', receipt.paperTitle)}
        <tr>
          <td style="padding:12px;color:#6B5B3E;font-size:13px;">Amount paid</td>
          <td style="padding:12px;color:#4A121A;font-size:17px;font-weight:bold;">${esc(receipt.amountLabel)}</td>
        </tr>
      </table>

      <p style="margin:20px 0 0;text-align:center;">
        <a href="${esc(receiptUrl)}" style="display:inline-block;background:#722332;color:#FAF5EB;text-decoration:none;padding:11px 22px;border-radius:9px;font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">View / download receipt</a>
      </p>

      <p style="margin:18px 0 0;color:#7A6B54;font-size:11.5px;line-height:1.6;">
        Registration fees are non-refundable. Please keep this email for your records.
      </p>
    </div>
  </div>
</div>`;

  return { subject, text, html };
}
