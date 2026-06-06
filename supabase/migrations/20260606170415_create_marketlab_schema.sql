-- MarketLab workshop schema: profiles, markets, positions, ledger_entries

-- Workshop starting balance: $10,000.00 fake = 1_000_000 cents
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  balance_cents bigint not null default 0,
  first_name text not null default '',
  last_name text not null default '',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create table public.markets (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  status text not null default 'open'
    check (status in ('open', 'closed', 'resolved')),
  close_date timestamptz not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger markets_set_updated_at
before update on public.markets
for each row
execute function public.set_updated_at();

create table public.positions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  market_id uuid not null references public.markets (id) on delete cascade,
  yes_shares_cents bigint not null default 0 check (yes_shares_cents >= 0),
  no_shares_cents bigint not null default 0 check (no_shares_cents >= 0),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id, market_id)
);

create index positions_user_id_idx on public.positions (user_id);
create index positions_market_id_idx on public.positions (market_id);

create trigger positions_set_updated_at
before update on public.positions
for each row
execute function public.set_updated_at();

create table public.ledger_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  market_id uuid references public.markets (id) on delete set null,
  amount_cents bigint not null,
  entry_type text not null
    check (entry_type in ('starting_balance', 'trade', 'payout', 'adjustment')),
  description text,
  created_at timestamptz not null default timezone('utc', now())
);

create index ledger_entries_user_id_created_at_idx
  on public.ledger_entries (user_id, created_at desc);

-- Create a profile with fake starting balance when a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, balance_cents, first_name, last_name)
  values (
    new.id,
    1000000,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', '')
  );

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.markets enable row level security;
alter table public.positions enable row level security;
alter table public.ledger_entries enable row level security;

create policy "markets_public_read"
  on public.markets
  for select
  to anon, authenticated
  using (true);

create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "positions_select_own"
  on public.positions
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "ledger_entries_select_own"
  on public.ledger_entries
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- Data API grants (RLS still applies)
grant select on public.markets to anon, authenticated;
grant select on public.profiles to authenticated;
grant select on public.positions to authenticated;
grant select on public.ledger_entries to authenticated;
