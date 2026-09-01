/**
 * A simple per-IP rate limit, on the Redis the visitor counter already uses.
 *
 * `create-order` is a public endpoint that, on every call, writes a database
 * row and opens an order with the payment gateway. Left unbounded, a script
 * could fill the registrations table and flood the merchant account with junk
 * orders — neither of which is an attack on the money, but both of which are a
 * bad afternoon for whoever has to clean up.
 *
 * Deliberately fails OPEN. If Redis is unreachable, registrations continue.
 * This is spam control, not a security boundary: the things that actually
 * protect the money are the server-side fee table and the webhook signature,
 * and neither depends on this. Turning away a genuine registrant because a
 * cache was down would be the worse failure.
 */

const WINDOW_SECONDS = 60 * 10;
const MAX_IN_WINDOW = 8;

function credentials() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

/**
 * The caller's address, as Vercel reports it.
 *
 * `x-forwarded-for` can be spoofed in general, but on Vercel the platform
 * appends the real peer and `x-real-ip` is set by the proxy itself, so the
 * latter is preferred. A spoofed value only ever lets someone rate-limit
 * themselves under a different key, which is not worth defending further given
 * this fails open anyway.
 */
export function clientKey(req) {
  const realIp = req.headers['x-real-ip'];
  if (realIp) return String(realIp);

  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return String(forwarded).split(',')[0].trim();

  return 'unknown';
}

/**
 * @returns {Promise<{allowed: boolean, remaining: number}>}
 */
/**
 * The key for the window the given moment falls in.
 *
 * The window number is part of the key rather than being kept as a TTL on a
 * shared one. That matters: if the EXPIRE below ever failed, a single shared
 * key would keep its count forever and lock the caller out permanently, while
 * a per-window key is simply abandoned when the window rolls over. The worst a
 * failed EXPIRE can do here is leave a dead key behind.
 */
export function windowKey(bucket, client, now = Date.now()) {
  return `ratelimit:${bucket}:${client}:${Math.floor(now / (WINDOW_SECONDS * 1000))}`;
}

export async function checkRateLimit(req, bucket) {
  const config = credentials();
  if (!config) return { allowed: true, remaining: MAX_IN_WINDOW };

  const key = windowKey(bucket, clientKey(req));

  try {
    // Upstash takes a single command at the base URL and a pipeline only at
    // `/pipeline`. Posting a pipeline to the base URL is read as one command
    // whose name is an array, which errors — and since this fails open, that
    // error would silently mean no rate limiting at all rather than a visible
    // fault.
    const response = await fetch(`${config.url.replace(/\/+$/, '')}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
      // One round trip, so the window is established as the count is taken.
      body: JSON.stringify([
        ['INCR', key],
        ['EXPIRE', key, String(WINDOW_SECONDS)],
      ]),
    });

    if (!response.ok) return { allowed: true, remaining: MAX_IN_WINDOW };

    // A pipeline replies with one { result } or { error } per command.
    const results = await response.json();
    const count = Number(results?.[0]?.result);
    if (!Number.isFinite(count)) return { allowed: true, remaining: MAX_IN_WINDOW };

    return { allowed: count <= MAX_IN_WINDOW, remaining: Math.max(0, MAX_IN_WINDOW - count) };
  } catch (error) {
    console.error('[rate-limit] failing open', error);
    return { allowed: true, remaining: MAX_IN_WINDOW };
  }
}

export const RATE_LIMIT = { WINDOW_SECONDS, MAX_IN_WINDOW };
