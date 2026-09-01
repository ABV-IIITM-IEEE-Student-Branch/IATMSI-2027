/**
 * Where this site lives, for building the URLs Cashfree sends people back to
 * and posts webhooks to.
 *
 * Environment first, `Host` header only as a last resort. The header is set by
 * whoever made the request, so on a public endpoint it is attacker-controlled;
 * trusting it would let someone create an order whose webhook is delivered to
 * a server of their choosing.
 */
export function siteOrigin(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/+$/, '');

  // Set by Vercel, and not settable by a caller.
  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercelHost) return `https://${vercelHost}`;

  // Local development only.
  const host = req?.headers?.host || 'localhost:5173';
  const protocol = host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https';
  return `${protocol}://${host}`;
}
