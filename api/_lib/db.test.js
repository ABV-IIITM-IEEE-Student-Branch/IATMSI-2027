import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { findUnconfirmedRegistrations, recordPaymentAttempt } from './db.js';

/**
 * The queries themselves.
 *
 * These assert the request that goes to PostgREST, not just the value that
 * comes back. A filter that is subtly wrong still returns rows — just the
 * wrong ones — so a mocked return value would happily agree with a broken
 * query.
 */

let requests;

function mockPostgrest(reply = []) {
  requests = [];
  global.fetch = vi.fn(async (url, options) => {
    requests.push({ url: String(url), method: options?.method || 'GET', headers: options?.headers });
    return { ok: true, text: async () => JSON.stringify(reply) };
  });
}

beforeEach(() => {
  process.env.SUPABASE_URL = 'https://project.supabase.co';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-key';
  mockPostgrest();
});

afterEach(() => {
  delete process.env.SUPABASE_URL;
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  vi.restoreAllMocks();
});

describe('finding registrations the sweep should look at', () => {
  const bounds = {
    startedBefore: '2026-09-02T12:00:00.000Z',
    startedAfter: '2026-08-26T12:00:00.000Z',
    limit: 25,
  };

  it('includes FAILED as well as PENDING', async () => {
    // A failed first attempt can be followed by a successful second one on the
    // same order. Querying only PENDING leaves that payer marked failed
    // forever if the second webhook was lost.
    await findUnconfirmedRegistrations(bounds);
    expect(decodeURIComponent(requests[0].url)).toContain('status=in.(PENDING,FAILED)');
  });

  it('never picks up a registration already paid', async () => {
    await findUnconfirmedRegistrations(bounds);
    const query = decodeURIComponent(requests[0].url);
    expect(query).not.toContain('PAID)');
    expect(query).not.toContain('status=eq.PAID');
  });

  it('bounds the age at BOTH ends in the query', async () => {
    // The upper bound skips checkouts still in progress. The lower bound is
    // the one that matters most: abandoned checkouts stay unconfirmed forever,
    // rows come back oldest-first under a limit, so excluding them anywhere
    // other than here lets them fill the batch and starve the sweep.
    const query = decodeURIComponent((await findUnconfirmedRegistrations(bounds), requests[0].url));
    expect(query).toContain(`created_at=lt.${bounds.startedBefore}`);
    expect(query).toContain(`created_at=gt.${bounds.startedAfter}`);
  });

  it('takes the oldest first, under a limit', async () => {
    await findUnconfirmedRegistrations(bounds);
    const query = decodeURIComponent(requests[0].url);
    expect(query).toContain('order=created_at.asc');
    expect(query).toContain('limit=25');
  });

  it('sends the service key, which is what bypasses row-level security', async () => {
    await findUnconfirmedRegistrations(bounds);
    expect(requests[0].headers.apikey).toBe('test-service-key');
    expect(requests[0].headers.Authorization).toBe('Bearer test-service-key');
  });
});

describe('recording a payment attempt', () => {
  it('deduplicates on the payment id when there is one', async () => {
    await recordPaymentAttempt({ order_id: 'o', cf_payment_id: '5114912', payment_status: 'SUCCESS' });
    expect(requests[0].url).toContain('on_conflict=cf_payment_id');
    expect(requests[0].headers.Prefer).toContain('merge-duplicates');
  });

  it('does not claim a conflict target when there is no payment id', async () => {
    // Postgres treats NULLs as distinct, so the upsert would not deduplicate
    // anyway — it would just insert a new row on every redelivery while
    // looking like it was deduplicating.
    await recordPaymentAttempt({ order_id: 'o', cf_payment_id: null, payment_status: null });
    expect(requests[0].url).not.toContain('on_conflict');
    expect(requests[0].headers.Prefer).not.toContain('merge-duplicates');
  });
});
