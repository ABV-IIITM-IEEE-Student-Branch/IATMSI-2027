import crypto from 'crypto';
import { Readable } from 'stream';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { readRawBody, verifySignature } from './webhook.js';

/**
 * The webhook signature is the only thing standing between "someone paid" and
 * "someone said they paid". If verification can be got past, registrations are
 * free to anyone who can find the URL — so these test the ways it could be got
 * past, not just that a valid signature passes.
 */

const SECRET = 'test_secret_key_do_not_use_anywhere';
const TIMESTAMP = '1758000000';
const BODY = JSON.stringify({
  data: { order: { order_id: 'IATMSI27-abc' }, payment: { payment_status: 'SUCCESS' } },
});

function sign(body, timestamp, secret = SECRET) {
  return crypto.createHmac('sha256', secret).update(timestamp + body).digest('base64');
}

beforeEach(() => {
  process.env.CASHFREE_CLIENT_SECRET = SECRET;
});

afterEach(() => {
  delete process.env.CASHFREE_CLIENT_SECRET;
});

describe('accepting a genuine delivery', () => {
  it('accepts a body signed with the API secret', () => {
    expect(verifySignature(BODY, sign(BODY, TIMESTAMP), TIMESTAMP)).toBe(true);
  });

  it('signs over the timestamp as well as the body', () => {
    // Cashfree concatenates timestamp + body. Signing the body alone is a
    // plausible misreading of the docs, and it must not verify.
    const bodyOnly = crypto.createHmac('sha256', SECRET).update(BODY).digest('base64');
    expect(verifySignature(BODY, bodyOnly, TIMESTAMP)).toBe(false);
  });
});

describe('rejecting forgeries', () => {
  it('rejects a body that changed after signing', () => {
    // The attack this exists to stop: take a real failed-payment notification
    // and edit it into a successful one.
    const signature = sign(BODY, TIMESTAMP);
    const tampered = BODY.replace('SUCCESS', 'FAILED');
    expect(verifySignature(tampered, signature, TIMESTAMP)).toBe(false);
  });

  it('rejects a signature made with the wrong secret', () => {
    expect(verifySignature(BODY, sign(BODY, TIMESTAMP, 'not_the_secret'), TIMESTAMP)).toBe(false);
  });

  it('rejects a signature replayed under a different timestamp', () => {
    expect(verifySignature(BODY, sign(BODY, TIMESTAMP), '1758000001')).toBe(false);
  });

  it('rejects a missing or empty signature', () => {
    // An absent header must not compare equal to anything — including to an
    // absent expected value.
    expect(verifySignature(BODY, undefined, TIMESTAMP)).toBe(false);
    expect(verifySignature(BODY, '', TIMESTAMP)).toBe(false);
    expect(verifySignature(BODY, null, TIMESTAMP)).toBe(false);
  });

  it('rejects a missing timestamp', () => {
    expect(verifySignature(BODY, sign(BODY, TIMESTAMP), undefined)).toBe(false);
    expect(verifySignature(BODY, sign(BODY, TIMESTAMP), '')).toBe(false);
  });

  it('rejects a signature of the wrong length without throwing', () => {
    // timingSafeEqual throws on mismatched lengths. If that throw escaped, the
    // handler's catch would turn a forgery into a 500 and Cashfree would retry
    // it — so the length check has to happen first.
    expect(() => verifySignature(BODY, 'short', TIMESTAMP)).not.toThrow();
    expect(verifySignature(BODY, 'short', TIMESTAMP)).toBe(false);
    expect(verifySignature(BODY, `${sign(BODY, TIMESTAMP)}extra`, TIMESTAMP)).toBe(false);
  });

  it('rejects everything when no secret is configured', () => {
    // A missing environment variable must fail closed. Falling back to an
    // empty key would let anyone who knows the scheme sign their own events.
    delete process.env.CASHFREE_CLIENT_SECRET;
    expect(verifySignature(BODY, sign(BODY, TIMESTAMP), TIMESTAMP)).toBe(false);
    expect(verifySignature(BODY, sign(BODY, TIMESTAMP, ''), TIMESTAMP)).toBe(false);
  });

  it('rejects a body that was parsed and re-serialised', () => {
    // Why the handler must not let Vercel parse the body: round-tripping
    // through JSON changes the bytes, and the signature covers bytes.
    const spaced = JSON.stringify(JSON.parse(BODY), null, 2);
    expect(spaced).not.toBe(BODY);
    expect(verifySignature(spaced, sign(BODY, TIMESTAMP), TIMESTAMP)).toBe(false);
  });

  it('refuses a non-string body instead of coercing it', () => {
    // A caller that forgot to read the raw body and passed the parsed object
    // would otherwise HMAC "[object Object]". That fails to match anyway, so
    // the type guard is belt-and-braces — this pins the behaviour rather than
    // the guard.
    expect(verifySignature(JSON.parse(BODY), sign(BODY, TIMESTAMP), TIMESTAMP)).toBe(false);
  });
});

describe('getting the raw bytes, whatever the platform did with them', () => {
  /** A request whose body is still unread. */
  function streamed(body, extra = {}) {
    return Object.assign(Readable.from([body]), extra);
  }

  it('reads an unread stream', async () => {
    await expect(readRawBody(streamed(BODY))).resolves.toBe(BODY);
  });

  it('uses a body the platform already buffered', async () => {
    // Some runtimes consume the stream before the handler runs. The bytes are
    // still intact on req.body, and reading the (now empty) stream instead
    // would verify against nothing.
    const req = streamed('', { body: Buffer.from(BODY) });
    await expect(readRawBody(req)).resolves.toBe(BODY);

    await expect(readRawBody(streamed('', { body: BODY }))).resolves.toBe(BODY);
  });

  it('uses req.rawBody when the platform provides it alongside the parse', async () => {
    const req = streamed('', { body: JSON.parse(BODY), rawBody: Buffer.from(BODY) });
    await expect(readRawBody(req)).resolves.toBe(BODY);
  });

  it('preserves bytes well enough for the signature to still verify', async () => {
    // The point of all of the above: whichever route the body arrived by, the
    // signature must still check out.
    const signature = sign(BODY, TIMESTAMP);
    for (const req of [
      streamed(BODY),
      streamed('', { body: Buffer.from(BODY) }),
      streamed('', { body: JSON.parse(BODY), rawBody: BODY }),
    ]) {
      expect(verifySignature(await readRawBody(req), signature, TIMESTAMP)).toBe(true);
    }
  });

  it('throws rather than verifying nothing when the bytes are gone', async () => {
    // Body parsed, no raw copy kept, stream drained. Silently returning ''
    // would look exactly like a forged delivery and send someone hunting an
    // attacker who does not exist.
    const req = streamed('', { body: JSON.parse(BODY) });
    await expect(readRawBody(req)).rejects.toThrow(/bodyParser/);
  });

  it('refuses a body far too large to be a webhook', async () => {
    const req = Object.assign(Readable.from(['x'.repeat(1_000_001)]), { destroy() {} });
    await expect(readRawBody(req)).rejects.toThrow(/too large/);
  });

  it('accepts a genuinely empty body when nothing was parsed', async () => {
    // An empty POST is not a parsed-away body; it fails signature checking on
    // its own merits rather than throwing here.
    await expect(readRawBody(streamed(''))).resolves.toBe('');
  });
});
