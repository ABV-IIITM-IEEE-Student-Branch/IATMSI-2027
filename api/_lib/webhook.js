import crypto from 'crypto';

/**
 * Cashfree webhook verification.
 *
 * The webhook is the only thing that confirms a registration, so anyone who
 * could forge one could register free. Cashfree signs each delivery with
 * HMAC-SHA256 over timestamp + raw body, keyed on the API secret.
 *
 * It must be the RAW body: re-serialising the parsed JSON reorders keys and
 * changes whitespace, and the signature then never matches.
 */
export function verifySignature(rawBody, signature, timestamp) {
  const secret = process.env.CASHFREE_CLIENT_SECRET;
  if (!secret || !signature || !timestamp || typeof rawBody !== 'string') {
    return false;
  }

  const expected = crypto
    .createHmac('sha256', secret)
    .update(timestamp + rawBody)
    .digest('base64');

  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  // Lengths must match before comparing, and the comparison is constant-time
  // so a wrong signature can't be narrowed down by timing the response.
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/**
 * Reads the untouched request body.
 *
 * The signature covers the exact bytes Cashfree sent, so those bytes have to
 * reach us unchanged. Which is harder than it sounds: the handler exports
 * `config.api.bodyParser = false` to ask the platform not to touch the body,
 * but runtimes differ in whether they honour it, and one that buffers the
 * stream first leaves nothing here to read.
 *
 * So rather than assume, this handles every shape the body can arrive in:
 *
 *   - a Buffer or string on `req.body`  — already buffered, bytes intact
 *   - `req.rawBody`                     — set by some platforms alongside the parse
 *   - an unread stream                  — the case the opt-out is meant to produce
 *
 * If the body was parsed into an object, the original bytes are gone and the
 * signature cannot be checked. That throws, loudly, rather than verifying
 * against an empty string — which would look like a forged delivery and send
 * someone hunting for an attacker who was never there.
 */
export function readRawBody(req) {
  if (Buffer.isBuffer(req.body)) return Promise.resolve(req.body.toString('utf8'));
  if (typeof req.body === 'string') return Promise.resolve(req.body);
  if (Buffer.isBuffer(req.rawBody)) return Promise.resolve(req.rawBody.toString('utf8'));
  if (typeof req.rawBody === 'string') return Promise.resolve(req.rawBody);

  const alreadyParsed = req.body !== undefined && req.body !== null;

  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      // A signed webhook is small; anything huge is not one.
      if (data.length > 1_000_000) {
        reject(new Error('Webhook body too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (data === '' && alreadyParsed) {
        reject(
          new Error(
            'Request body was parsed before the handler ran, so the raw bytes are gone ' +
              'and the signature cannot be verified. The platform is ignoring ' +
              'config.api.bodyParser = false.',
          ),
        );
        return;
      }
      resolve(data);
    });
    req.on('error', reject);
  });
}
