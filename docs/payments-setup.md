# Registration payments — setup

Online registration takes card, UPI, net banking and wallet payments through
Cashfree, records each registration in Supabase, and emails a receipt.

Nothing below needs a code change. All of it is configuration.

---

## The one rule

**Fee amounts live in `api/_lib/fees.js` and nowhere else.**

The browser never sends a price. It sends who is registering; the server looks
up what that costs. This is why an edited request can't buy a ₹7,500
registration for ₹1.

Two consequences worth knowing:

- To change a fee, edit `api/_lib/fees.js` and deploy. It is deliberately
  outside `src/data`, so it is **not** editable through the visual editor —
  a mis-click should never change what someone is charged.
- `npm test` checks the table cell by cell. If you change a price, a test will
  fail until you update it deliberately.

---

## 1. Supabase (registration records)

1. Create a project at [supabase.com](https://supabase.com). The free tier is
   ample for a conference.
2. Open **SQL Editor → New query**, paste all of [`supabase/schema.sql`](../supabase/schema.sql),
   and run it.
3. Go to **Project Settings → API** and copy:
   - the **Project URL** → `SUPABASE_URL`
   - the **`service_role`** key → `SUPABASE_SERVICE_ROLE_KEY`

> The `service_role` key bypasses row-level security. It belongs only in Vercel's
> environment variables — never in the repository, and never in the browser.
> The schema turns RLS on with no policies, so these tables are reachable from
> the serverless functions and from nowhere else.

## 2. Cashfree (the gateway)

1. Sign up at [cashfree.com](https://www.cashfree.com) with the conference's
   details. KYC needs the organisation's PAN, a bank account and address proof.
2. **Start in sandbox.** Dashboard → **Developers → API Keys**, in *Test*
   mode, gives you `CASHFREE_CLIENT_ID` and `CASHFREE_CLIENT_SECRET`.
   Leave `CASHFREE_MODE=sandbox`.
3. Add the webhook: Dashboard → **Developers → Webhooks → Add endpoint**

   ```
   https://YOUR-DOMAIN/api/webhook
   ```

   Subscribe to the payment success and failure events.

4. When you are ready to take real money, repeat with *Production* keys and set
   `CASHFREE_MODE=production`. Nothing else changes — the code picks the API
   host from that one variable.

### Testing in sandbox

Cashfree's sandbox provides test cards and a simulated UPI flow; use those to
run a full registration end to end. Check afterwards that:

- the `registrations` row moved from `PENDING` to `PAID`,
- a `payment_attempts` row exists with a `cf_payment_id`,
- the receipt email arrived,
- reloading `/registration/payment?order_id=…` still shows the receipt.

## 3. Receipt email

Uses SMTP with a Gmail **App Password** — not the account password, which
Google will refuse anyway. Generate one under
**Google Account → Security → 2-Step Verification → App passwords**, then set
`SMTP_USER`, `SMTP_PASS` and `MAIL_FROM`.

If mail is not configured, payments still work and receipts are still shown on
screen; only the email is skipped.

## 4. Vercel

Add every variable from [`.env.example`](../.env.example) under
**Project → Settings → Environment Variables**, then redeploy.

Set `SITE_URL` to the live address. The return and webhook URLs are built from
it rather than from the request's `Host` header, which a caller controls.

---

## How a registration flows

```
Browser                  /api/create-order            Cashfree             /api/webhook
   │                            │                         │                      │
   ├─ details, no price ───────▶│                         │                      │
   │                            ├─ calculateFee()         │                      │
   │                            ├─ store PENDING          │                      │
   │                            ├─ create order ─────────▶│                      │
   │◀─ payment session id ──────┤                         │                      │
   ├─ checkout on Cashfree ────────────────────────────  ▶│                      │
   │                            │                         ├─ signed event ──────▶│
   │                            │                         │                      ├─ verify signature
   │                            │                         │                      ├─ check amount matches
   │◀─ redirected to /registration/payment?order_id=…     │                      ├─ mark PAID
   │                            │                         │                      └─ email receipt
   └─ /api/payment-status ──────────────────────────────▶ asks Cashfree directly
```

Two things confirm a payment, and the payer's browser is neither of them:

- the **webhook**, whose signature is verified over the raw bytes before the
  body is parsed; and
- **`/api/payment-status`**, which asks Cashfree server-to-server when a
  webhook was delayed or lost.

The order id is 24 random hex characters, because the receipt page is reachable
by whoever holds it. A sequential id would let anyone read other registrants'
details.

---

## Local development

`npm run dev` runs the `api/` functions too, through a dev-only Vite plugin, so
the fee table and the form work locally. Put credentials in `.env.local`
(git-ignored) if you want to exercise the full flow; without them the endpoints
report that payment is not configured and the page falls back cleanly.

```bash
npm test
```

runs the payment tests: the fee table, input validation, order creation and
webhook verification.
