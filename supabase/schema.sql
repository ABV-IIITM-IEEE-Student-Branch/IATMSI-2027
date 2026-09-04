-- IATMSI-2027 registration payments.
--
-- Run once in the Supabase SQL editor (Dashboard -> SQL Editor -> New query).
-- Safe to re-run: every statement is guarded.

create extension if not exists "pgcrypto";

-- One row per registration attempt, created before the payer leaves for
-- Cashfree and updated when payment is confirmed.
create table if not exists public.registrations (
    id                uuid primary key default gen_random_uuid(),

    -- Our order id, also the id Cashfree knows the order by. High entropy,
    -- because the receipt page is reachable by whoever holds it.
    order_id          text not null unique,

    full_name         text not null,
    email             text not null,
    phone             text not null,
    affiliation       text,
    country           text,

    -- Where the request actually came from, as Vercel reported it.
    --
    -- `region` below decides the price and is self-declared, and the India/Nepal
    -- rate is roughly half the international one. Nothing here blocks a
    -- mismatch — a genuine Indian delegate may well register while travelling —
    -- but recording it lets the organisers see, for example, someone in the US
    -- who paid the domestic rate. See docs/payments-setup.md for the query.
    payer_country     text,

    -- The selections that decide the price. Constrained here as well as in
    -- the API so a bad value cannot be stored even by a future code path.
    category          text not null check (category in (
                          'tutorial', 'student', 'professional',
                          'coauthor_without_kit', 'coauthor_with_kit')),
    region            text not null check (region in ('indian_nepali', 'international')),
    membership        text not null check (membership in ('ieee', 'non_ieee')),
    ieee_number       text,

    paper_id          text,
    paper_title       text,

    -- What the server decided this costs. Never supplied by the browser.
    period            text not null check (period in ('early', 'regular')),
    currency          text not null check (currency in ('INR', 'USD')),
    amount            numeric(10, 2) not null check (amount > 0),

    status            text not null default 'PENDING'
                          check (status in ('PENDING', 'PAID', 'FAILED')),
    cf_payment_id     text,
    paid_at           timestamptz,
    receipt_sent_at   timestamptz,

    created_at        timestamptz not null default now(),
    updated_at        timestamptz not null default now()
);

create index if not exists registrations_email_idx  on public.registrations (email);
create index if not exists registrations_status_idx on public.registrations (status);

-- One row per payment event Cashfree tells us about.
--
-- `cf_payment_id` is unique so that a retried webhook merges into the row it
-- already wrote instead of adding another. Without it, a gateway retry would
-- look exactly like a second payment.
create table if not exists public.payment_attempts (
    id                uuid primary key default gen_random_uuid(),
    order_id          text not null references public.registrations (order_id) on delete cascade,
    cf_payment_id     text unique,
    payment_status    text,
    payment_amount    numeric(10, 2),
    payment_currency  text,
    payment_method    text,
    -- The event as received, kept for reconciling against Cashfree's dashboard
    -- if a payment is ever disputed.
    raw_event         jsonb,
    created_at        timestamptz not null default now()
);

create index if not exists payment_attempts_order_idx on public.payment_attempts (order_id);

-- Row-level security on, with no policies deliberately.
--
-- These tables hold names, email addresses and payment records. The anon key
-- shipped to the browser gets nothing; only the service role key held by the
-- serverless functions can read or write, and it bypasses RLS. Adding a policy
-- here would open that up, so don't, unless you mean to.
alter table public.registrations   enable row level security;
alter table public.payment_attempts enable row level security;

-- Migrations for tables created by an earlier version of this file. Each is a
-- no-op on a fresh database, so the whole script stays safe to re-run.
alter table public.registrations add column if not exists payer_country text;
