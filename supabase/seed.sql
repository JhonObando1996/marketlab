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

-- Workshop demo auth users (idempotent; profiles created by on_auth_user_created trigger)
do $$
declare
  user_id uuid;
begin
  if not exists (select 1 from auth.users where email = 'ada@marketlab.demo') then
    user_id := gen_random_uuid();
    insert into auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at
    ) values (
      '00000000-0000-0000-0000-000000000000',
      user_id,
      'authenticated',
      'authenticated',
      'ada@marketlab.demo',
      extensions.crypt('Workshop123!', extensions.gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"first_name":"Ada","last_name":"Lovelace"}',
      now(),
      now()
    );
    insert into auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      provider_id,
      last_sign_in_at,
      created_at,
      updated_at
    ) values (
      gen_random_uuid(),
      user_id,
      jsonb_build_object('sub', user_id::text, 'email', 'ada@marketlab.demo'),
      'email',
      user_id::text,
      now(),
      now(),
      now()
    );
  end if;

  if not exists (select 1 from auth.users where email = 'linus@marketlab.demo') then
    user_id := gen_random_uuid();
    insert into auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at
    ) values (
      '00000000-0000-0000-0000-000000000000',
      user_id,
      'authenticated',
      'authenticated',
      'linus@marketlab.demo',
      extensions.crypt('Workshop123!', extensions.gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"first_name":"Linus","last_name":"Torvalds"}',
      now(),
      now()
    );
    insert into auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      provider_id,
      last_sign_in_at,
      created_at,
      updated_at
    ) values (
      gen_random_uuid(),
      user_id,
      jsonb_build_object('sub', user_id::text, 'email', 'linus@marketlab.demo'),
      'email',
      user_id::text,
      now(),
      now(),
      now()
    );
  end if;
end $$;
