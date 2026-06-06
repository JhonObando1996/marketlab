# Demo users

Workshop accounts with fake starting balance ($10,000.00 fake). Create or refresh them with:

```bash
task db:seed:users
```

Requires `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`.

| Email | Password | Name |
|-------|----------|------|
| `ada@marketlab.demo` | `Workshop123!` | Ada Lovelace |
| `linus@marketlab.demo` | `Workshop123!` | Linus Torvalds |

Sign in at [/sign-in](http://localhost:3000/sign-in) after running the dev server.
