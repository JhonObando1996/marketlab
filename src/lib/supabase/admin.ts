import { createClient } from "@supabase/supabase-js";

import { env } from "@/env";
import { getSupabaseConfig } from "@/lib/supabase/config";
import type { Database } from "@/lib/supabase/database.types";

export function createAdminSupabaseClient() {
  const config = getSupabaseConfig();
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!config || !serviceRoleKey) {
    return null;
  }

  return createClient<Database>(config.url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
