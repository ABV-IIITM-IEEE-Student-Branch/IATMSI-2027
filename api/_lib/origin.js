/**
 * Where this deployment lives, for building the URLs Cashfree sends people
 * back to and posts webhooks to.
 *
 * Environment first, `Host` header only as a last resort. The header is set by
 * whoever made the request, so on a public endpoint it is attacker-controlled;
 * trusting it would let someone create an order whose webhook is delivered to
 * a server of their choosing.
 *
 * "This deployment" is the important part. A preview must point at itself, not
 * at production: `VERCEL_PROJECT_PRODUCTION_URL` is set on every deployment
 * including previews, so reaching for it first sends a preview's webhooks to
 * the production domain — which is running whatever is on `main` and may not
 * have these endpoints at all. The payment then succeeds at the gateway and is
 * never confirmed, which looks exactly like a broken integration.
 */
export function siteOrigin(req) {
  // Explicit override always wins. Scope it to Production in Vercel, so
  // previews fall through to the branch below.
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/+$/, '');

  // Set by Vercel and not settable by a caller.
  if (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  // Preview. The branch URL is preferred over the per-deployment one because
  // it survives a redeploy, so a webhook endpoint registered against it keeps
  // working after the next push.
  const previewHost = process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL;
  if (previewHost) return `https://${previewHost}`;

  // Local development only.
  const host = req?.headers?.host || 'localhost:5173';
  const protocol = host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https';
  return `${protocol}://${host}`;
}
