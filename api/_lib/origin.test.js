import { afterEach, describe, expect, it } from 'vitest';
import { siteOrigin } from './origin.js';

/**
 * Which origin a deployment claims to be.
 *
 * This decides where Cashfree posts the webhook, and the webhook is what
 * confirms a registration. Point it at the wrong deployment and payments
 * succeed at the gateway while nothing here ever hears about them.
 */

const VERCEL_VARS = [
  'SITE_URL',
  'VERCEL_ENV',
  'VERCEL_PROJECT_PRODUCTION_URL',
  'VERCEL_BRANCH_URL',
  'VERCEL_URL',
];

afterEach(() => {
  for (const name of VERCEL_VARS) delete process.env[name];
});

const req = (host = 'localhost:5173') => ({ headers: { host } });

describe('production', () => {
  it('uses the configured site URL above everything else', () => {
    process.env.SITE_URL = 'https://iatmsi2027.org';
    process.env.VERCEL_ENV = 'production';
    process.env.VERCEL_PROJECT_PRODUCTION_URL = 'project.vercel.app';

    expect(siteOrigin(req())).toBe('https://iatmsi2027.org');
  });

  it('tolerates a trailing slash on it', () => {
    process.env.SITE_URL = 'https://iatmsi2027.org/';
    expect(siteOrigin(req())).toBe('https://iatmsi2027.org');
  });

  it('falls back to the project production domain', () => {
    process.env.VERCEL_ENV = 'production';
    process.env.VERCEL_PROJECT_PRODUCTION_URL = 'iatmsi.vercel.app';
    process.env.VERCEL_URL = 'iatmsi-abc123.vercel.app';

    expect(siteOrigin(req())).toBe('https://iatmsi.vercel.app');
  });
});

describe('preview deployments', () => {
  it('points at itself, not at production', () => {
    // The bug this exists to prevent. VERCEL_PROJECT_PRODUCTION_URL is set on
    // previews too, so preferring it sent a preview's webhooks to the
    // production domain — which runs whatever is on main and may have no such
    // endpoint. The payment succeeds and is never confirmed.
    process.env.VERCEL_ENV = 'preview';
    process.env.VERCEL_PROJECT_PRODUCTION_URL = 'iatmsi.vercel.app';
    process.env.VERCEL_BRANCH_URL = 'iatmsi-git-feat-payments.vercel.app';
    process.env.VERCEL_URL = 'iatmsi-abc123.vercel.app';

    const origin = siteOrigin(req());
    expect(origin).toBe('https://iatmsi-git-feat-payments.vercel.app');
    expect(origin).not.toContain('iatmsi.vercel.app/');
  });

  it('prefers the branch URL, which survives a redeploy', () => {
    // A webhook endpoint registered in the gateway against a per-deployment
    // URL would stop matching on the next push.
    process.env.VERCEL_ENV = 'preview';
    process.env.VERCEL_BRANCH_URL = 'iatmsi-git-feat-payments.vercel.app';
    process.env.VERCEL_URL = 'iatmsi-abc123.vercel.app';

    expect(siteOrigin(req())).toBe('https://iatmsi-git-feat-payments.vercel.app');
  });

  it('falls back to the deployment URL when there is no branch URL', () => {
    process.env.VERCEL_ENV = 'preview';
    process.env.VERCEL_URL = 'iatmsi-abc123.vercel.app';

    expect(siteOrigin(req())).toBe('https://iatmsi-abc123.vercel.app');
  });

  it('still honours an explicit site URL if one is scoped to previews', () => {
    process.env.SITE_URL = 'https://staging.iatmsi2027.org';
    process.env.VERCEL_ENV = 'preview';
    process.env.VERCEL_URL = 'iatmsi-abc123.vercel.app';

    expect(siteOrigin(req())).toBe('https://staging.iatmsi2027.org');
  });
});

describe('never trusting the request', () => {
  it('ignores the Host header whenever the platform has told us who we are', () => {
    // Host is attacker-controlled on a public endpoint. If it reached the
    // webhook URL, someone could have payment notifications delivered to a
    // server of their choosing.
    process.env.VERCEL_ENV = 'production';
    process.env.VERCEL_PROJECT_PRODUCTION_URL = 'iatmsi.vercel.app';

    const origin = siteOrigin(req('attacker.example.com'));
    expect(origin).toBe('https://iatmsi.vercel.app');
    expect(origin).not.toContain('attacker');
  });

  it('ignores it on previews too', () => {
    process.env.VERCEL_ENV = 'preview';
    process.env.VERCEL_URL = 'iatmsi-abc123.vercel.app';

    expect(siteOrigin(req('attacker.example.com'))).not.toContain('attacker');
  });
});

describe('local development', () => {
  it('uses the host header only when nothing else is set', () => {
    expect(siteOrigin(req('localhost:5173'))).toBe('http://localhost:5173');
    expect(siteOrigin(req('127.0.0.1:3000'))).toBe('http://127.0.0.1:3000');
  });

  it('assumes https for a non-loopback host', () => {
    expect(siteOrigin(req('mytunnel.ngrok-free.app'))).toBe('https://mytunnel.ngrok-free.app');
  });

  it('has a default when there is no request at all', () => {
    // The cron sweep calls this with no meaningful request.
    expect(siteOrigin(undefined)).toBe('http://localhost:5173');
  });
});
