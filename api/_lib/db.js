/**
 * Registration storage, on Supabase Postgres.
 *
 * Talks to PostgREST over plain fetch rather than pulling in the Supabase
 * client, for the same reason `visitors.js` talks to Upstash over REST: a
 * serverless function has nowhere to keep a connection pool, and the whole of
 * what we need here is six queries.
 *
 * Every call uses the service role key, which bypasses row-level security. The
 * schema therefore enables RLS with no policies, so these tables are reachable
 * from this server and from nowhere else — in particular not from the browser,
 * which never sees this key.
 */

export function supabaseCredentials() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url: url.replace(/\/+$/, ''), key } : null;
}

async function pg(table, { method = 'GET', query = '', body, prefer } = {}) {
  const config = supabaseCredentials();
  if (!config) throw new Error('Supabase is not configured.');

  const headers = {
    apikey: config.key,
    Authorization: `Bearer ${config.key}`,
    'Content-Type': 'application/json',
  };
  if (prefer) headers.Prefer = prefer;

  const response = await fetch(`${config.url}/rest/v1/${table}${query}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Supabase ${method} ${table} failed (${response.status}): ${text.slice(0, 300)}`);
  }
  return text ? JSON.parse(text) : null;
}

/**
 * Records the intent to register, before the payer is sent to Cashfree.
 *
 * The amount stored here is the one this server calculated. The webhook later
 * compares what was actually paid against it, so a row written now is what
 * makes tampering detectable afterwards.
 */
export async function insertRegistration(registration) {
  const rows = await pg('registrations', {
    method: 'POST',
    body: registration,
    prefer: 'return=representation',
  });
  return rows?.[0] || null;
}

export async function findRegistration(orderId) {
  const rows = await pg('registrations', {
    query: `?order_id=eq.${encodeURIComponent(orderId)}&select=*&limit=1`,
  });
  return rows?.[0] || null;
}

export async function updateRegistration(orderId, patch) {
  const rows = await pg('registrations', {
    method: 'PATCH',
    query: `?order_id=eq.${encodeURIComponent(orderId)}`,
    body: { ...patch, updated_at: new Date().toISOString() },
    prefer: 'return=representation',
  });
  return rows?.[0] || null;
}

/**
 * Records one payment event, keyed on Cashfree's payment id.
 *
 * Gateways retry webhooks, and a retry must not be mistaken for a second
 * payment. `cf_payment_id` is unique and this upserts on it, so a delivery
 * that arrives five times leaves one row.
 */
export async function recordPaymentAttempt(attempt) {
  // Postgres treats NULLs as distinct, so a unique index on `cf_payment_id`
  // does not constrain rows that have none and the upsert would insert a fresh
  // one on every redelivery. Events without a payment id are not payments —
  // they carry nothing worth deduplicating on — so they are appended plainly
  // rather than pretending the conflict target applies.
  const deduplicable = Boolean(attempt.cf_payment_id);

  const rows = await pg('payment_attempts', {
    method: 'POST',
    query: deduplicable ? '?on_conflict=cf_payment_id' : '',
    body: attempt,
    prefer: deduplicable
      ? 'resolution=merge-duplicates,return=representation'
      : 'return=representation',
  });
  return rows?.[0] || null;
}

/**
 * Registrations that were started but never confirmed.
 *
 * `startedBefore` skips checkouts that may still be in progress; without it the
 * sweep would query Cashfree about orders the payer is looking at right now.
 */
export async function findPendingRegistrations({ startedBefore, limit = 50 }) {
  return (
    (await pg('registrations', {
      query:
        `?status=eq.PENDING&created_at=lt.${encodeURIComponent(startedBefore)}` +
        `&select=*&order=created_at.asc&limit=${Number(limit)}`,
    })) || []
  );
}

/**
 * Claims the right to send the receipt for an order, exactly once.
 *
 * Written as a conditional update rather than "read, then decide": two webhook
 * deliveries can be in flight at the same moment, and a check followed by a
 * write would let both see an unsent receipt and both send one. Postgres
 * applies the `is.null` filter and the write together, so only the first call
 * gets a row back.
 */
export async function claimReceiptSend(orderId) {
  const rows = await pg('registrations', {
    method: 'PATCH',
    query: `?order_id=eq.${encodeURIComponent(orderId)}&receipt_sent_at=is.null`,
    body: { receipt_sent_at: new Date().toISOString() },
    prefer: 'return=representation',
  });
  return Boolean(rows?.length);
}

/** Releases the claim above when the send actually failed, so a retry can try again. */
export async function releaseReceiptClaim(orderId) {
  await pg('registrations', {
    method: 'PATCH',
    query: `?order_id=eq.${encodeURIComponent(orderId)}`,
    body: { receipt_sent_at: null },
  });
}
