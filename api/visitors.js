/**
 * Visitor counts, per country.
 *
 * Vercel puts the visitor's country on every request as `x-vercel-ip-country`,
 * so no IP lookup is needed. The running totals live in a single Redis hash —
 * serverless functions keep no state of their own between invocations.
 *
 * Talks to Upstash over its REST API rather than a Redis client: a serverless
 * function has nowhere to keep a connection pool, and a fresh TCP handshake per
 * invocation is exactly what the REST endpoint exists to avoid.
 *
 * Returns an empty result when the database isn't configured, so the site works
 * unchanged locally, in previews, and before the database has been connected.
 */

const HASH_KEY = 'visitors:countries';
const SEEN_COOKIE = 'iatmsi_counted';
/** How long before the same browser counts again. */
const COOKIE_MAX_AGE = 60 * 60 * 24;

/** Vercel injects one of these pairs depending on how the store was added. */
function credentials() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

async function redis(command, { url, token }) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });

  if (!response.ok) {
    throw new Error(`Upstash responded ${response.status}`);
  }
  const { result, error } = await response.json();
  if (error) throw new Error(error);
  return result;
}

/** HGETALL comes back as a flat [field, value, field, value, ...] array. */
function pairsToCounts(flat) {
  const counts = {};
  for (let i = 0; i < flat.length - 1; i += 2) {
    const value = Number(flat[i + 1]);
    if (Number.isFinite(value) && value > 0) counts[flat[i].toLowerCase()] = value;
  }
  return counts;
}

function alreadyCounted(req) {
  return (req.headers.cookie || '').split(';').some((part) => part.trim().startsWith(`${SEEN_COOKIE}=`));
}

export default async function handler(req, res) {
  const config = credentials();

  // Nothing configured yet — say so plainly instead of failing. The footer
  // treats an empty breakdown as "hide the section".
  if (!config) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ configured: false, total: 0, countries: {} });
  }

  try {
    const country = (req.headers['x-vercel-ip-country'] || '').toLowerCase();

    // Count a browser once a day at most, so refreshing doesn't inflate it.
    // The cookie is HttpOnly: the page can't clear it to be counted again.
    if (country && /^[a-z]{2}$/.test(country) && !alreadyCounted(req)) {
      await redis(['HINCRBY', HASH_KEY, country, 1], config);
      res.setHeader(
        'Set-Cookie',
        `${SEEN_COOKIE}=1; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; SameSite=Lax; Secure`,
      );
    }

    const counts = pairsToCounts((await redis(['HGETALL', HASH_KEY], config)) || []);
    const total = Object.values(counts).reduce((sum, n) => sum + n, 0);

    // Served from Vercel's edge for a minute, so Redis sees roughly one read
    // per minute however busy the site is. A counter being 60s stale is fine,
    // and it keeps the whole thing inside the free tier.
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return res.status(200).json({ configured: true, total, countries: counts });
  } catch (error) {
    // A counter is decoration; it must never take the footer down with it.
    console.error('[visitors]', error);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ configured: false, total: 0, countries: {} });
  }
}
