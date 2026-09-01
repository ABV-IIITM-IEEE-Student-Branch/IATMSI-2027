import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { checkRateLimit, clientKey, windowKey, RATE_LIMIT } from './rateLimit.js';

/**
 * The rate limit.
 *
 * It fails open by design, which makes it the kind of component that can be
 * completely broken and look completely fine — every request is allowed either
 * way. So these assert the actual call being made, not just the decision that
 * comes back from it.
 */

const URL_BASE = 'https://example.upstash.io';

function req(headers = { 'x-real-ip': '203.0.113.9' }) {
  return { headers };
}

/** Captures the request instead of making one. */
function mockUpstash(handler) {
  const calls = [];
  global.fetch = vi.fn(async (url, options) => {
    calls.push({ url, body: JSON.parse(options.body), headers: options.headers });
    return handler(calls.length);
  });
  return calls;
}

function pipelineReply(count) {
  return {
    ok: true,
    json: async () => [{ result: count }, { result: 1 }],
  };
}

beforeEach(() => {
  process.env.KV_REST_API_URL = URL_BASE;
  process.env.KV_REST_API_TOKEN = 'test-token';
});

afterEach(() => {
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;
  vi.restoreAllMocks();
});

describe('talking to Upstash correctly', () => {
  it('sends a pipeline to /pipeline, not the base URL', async () => {
    // The bug this exists to catch: Upstash reads the base URL as a single
    // command, so a pipeline posted there errors. Because this fails open,
    // that error would mean no rate limiting at all — silently.
    const calls = mockUpstash(() => pipelineReply(1));
    await checkRateLimit(req(), 'create-order');

    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(`${URL_BASE}/pipeline`);
  });

  it('sends an array of commands, which is what /pipeline expects', async () => {
    const calls = mockUpstash(() => pipelineReply(1));
    await checkRateLimit(req(), 'create-order');

    const body = calls[0].body;
    expect(Array.isArray(body)).toBe(true);
    expect(body.every((command) => Array.isArray(command))).toBe(true);
    expect(body[0][0]).toBe('INCR');
    expect(body[1][0]).toBe('EXPIRE');
  });

  it('always sets an expiry, so a key cannot outlive its window', async () => {
    const calls = mockUpstash(() => pipelineReply(1));
    await checkRateLimit(req(), 'create-order');

    const expire = calls[0].body[1];
    expect(Number(expire[2])).toBe(RATE_LIMIT.WINDOW_SECONDS);
    // No NX. With a per-window key there is nothing to preserve, and NX would
    // depend on a Redis version rather than on anything we control.
    expect(expire).toHaveLength(3);
  });

  it('authenticates with the token', async () => {
    const calls = mockUpstash(() => pipelineReply(1));
    await checkRateLimit(req(), 'create-order');
    expect(calls[0].headers.Authorization).toBe('Bearer test-token');
  });
});

describe('counting', () => {
  it('allows up to the limit and refuses past it', async () => {
    mockUpstash((n) => pipelineReply(n));

    for (let i = 1; i <= RATE_LIMIT.MAX_IN_WINDOW; i += 1) {
      expect((await checkRateLimit(req(), 'create-order')).allowed).toBe(true);
    }
    expect((await checkRateLimit(req(), 'create-order')).allowed).toBe(false);
  });

  it('counts each caller separately', async () => {
    const calls = mockUpstash(() => pipelineReply(1));

    await checkRateLimit(req({ 'x-real-ip': '203.0.113.9' }), 'create-order');
    await checkRateLimit(req({ 'x-real-ip': '198.51.100.4' }), 'create-order');

    expect(calls[0].body[0][1]).not.toBe(calls[1].body[0][1]);
  });

  it('counts each bucket separately', async () => {
    const calls = mockUpstash(() => pipelineReply(1));

    await checkRateLimit(req(), 'create-order');
    await checkRateLimit(req(), 'something-else');

    expect(calls[0].body[0][1]).not.toBe(calls[1].body[0][1]);
  });
});

describe('the window key', () => {
  it('is stable inside a window and changes between them', () => {
    const start = 1_800_000_000_000;
    const windowMs = RATE_LIMIT.WINDOW_SECONDS * 1000;

    expect(windowKey('b', 'ip', start)).toBe(windowKey('b', 'ip', start + windowMs - 1));
    expect(windowKey('b', 'ip', start)).not.toBe(windowKey('b', 'ip', start + windowMs));
  });

  it('never reuses an earlier window, so a stuck key cannot lock anyone out', () => {
    // If EXPIRE fails the key persists — but the next window uses a different
    // key, so a permanent count is impossible.
    const now = Date.now();
    const later = now + RATE_LIMIT.WINDOW_SECONDS * 1000 * 10;
    expect(windowKey('b', 'ip', later)).not.toBe(windowKey('b', 'ip', now));
  });
});

describe('failing open', () => {
  it('allows when Upstash is not configured', async () => {
    delete process.env.KV_REST_API_URL;
    delete process.env.KV_REST_API_TOKEN;
    global.fetch = vi.fn();

    expect((await checkRateLimit(req(), 'create-order')).allowed).toBe(true);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it.each([
    ['an error status', () => ({ ok: false, json: async () => ({}) })],
    ['an unparseable reply', () => ({ ok: true, json: async () => ({ nope: true }) })],
    ['a command-level error', () => ({ ok: true, json: async () => [{ error: 'ERR' }] })],
    ['a thrown request', () => { throw new Error('network down'); }],
  ])('allows the registration through on %s', async (_label, handler) => {
    mockUpstash(handler);
    // Turning away a genuine registrant because a cache was unavailable is
    // worse than letting spam through; the fee table and webhook signature are
    // what actually protect the money.
    expect((await checkRateLimit(req(), 'create-order')).allowed).toBe(true);
  });
});

describe('identifying the caller', () => {
  it('prefers the address the platform set', () => {
    expect(
      clientKey({ headers: { 'x-real-ip': '203.0.113.9', 'x-forwarded-for': '10.0.0.1' } }),
    ).toBe('203.0.113.9');
  });

  it('falls back to the first forwarded address', () => {
    expect(clientKey({ headers: { 'x-forwarded-for': '203.0.113.9, 10.0.0.1' } })).toBe('203.0.113.9');
  });

  it('has a fallback rather than throwing when there is no address', () => {
    expect(clientKey({ headers: {} })).toBe('unknown');
  });
});
