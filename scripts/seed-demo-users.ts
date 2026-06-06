/**
 * Idempotent workshop demo users for MarketLab.
 *
 * Run: task db:seed:users
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local.
 */

import { createClient } from "@supabase/supabase-js";

type DemoUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const demoUsers: DemoUser[] = [
  {
    email: "ada@marketlab.demo",
    password: "Workshop123!",
    firstName: "Ada",
    lastName: "Lovelace",
  },
  {
    email: "linus@marketlab.demo",
    password: "Workshop123!",
    firstName: "Linus",
    lastName: "Torvalds",
  },
];

function loadEnv(name: string): string | undefined {
  return process.env[name] || undefined;
}

async function main() {
  const url = loadEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = loadEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !serviceRoleKey) {
    console.error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.",
    );
    process.exit(1);
  }

  const admin = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  for (const user of demoUsers) {
    const { data: existing, error: listError } =
      await admin.auth.admin.listUsers();

    if (listError) {
      console.error(`Failed to list users: ${listError.message}`);
      process.exit(1);
    }

    const alreadyExists = existing.users.some(
      (entry) => entry.email?.toLowerCase() === user.email.toLowerCase(),
    );

    if (alreadyExists) {
      console.log(`Skipped (exists): ${user.email}`);
      continue;
    }

    const { error } = await admin.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: {
        first_name: user.firstName,
        last_name: user.lastName,
      },
    });

    if (error) {
      console.error(`Failed to create ${user.email}: ${error.message}`);
      process.exit(1);
    }

    console.log(`Created: ${user.email}`);
  }

  console.log("Demo users ready.");
}

main();
