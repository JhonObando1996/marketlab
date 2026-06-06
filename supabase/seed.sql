-- Workshop demo markets (idempotent inserts for local reset and remote seed runs)

insert into public.markets (title, description, status, close_date)
select
  'Will it rain in Quito tomorrow?',
  'A fictional weather market for the workshop. Buy Yes if you think it rains, No if you think it stays dry.',
  'open',
  timezone('utc', now()) + interval '7 days'
where not exists (
  select 1 from public.markets where title = 'Will it rain in Quito tomorrow?'
);

insert into public.markets (title, description, status, close_date)
select
  'Will the workshop finish on time?',
  'Binary outcome market for demo browsing. No real money or settlement in this step.',
  'open',
  timezone('utc', now()) + interval '30 days'
where not exists (
  select 1 from public.markets where title = 'Will the workshop finish on time?'
);

insert into public.markets (title, description, status, close_date)
select
  'Will Cursor ship a new feature this month?',
  'Closed sample market to show status badges and buying unavailable states in the UI.',
  'closed',
  timezone('utc', now()) - interval '1 day'
where not exists (
  select 1 from public.markets where title = 'Will Cursor ship a new feature this month?'
);
