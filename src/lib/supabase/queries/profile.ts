import type { SupabaseClient, User } from "@supabase/supabase-js";

import type { Database } from "@/lib/supabase/database.types";

export type ProfileSummary = Pick<
  Database["public"]["Tables"]["profiles"]["Row"],
  "id" | "balance_cents" | "first_name" | "last_name"
>;

export async function getProfileForUser(
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<ProfileSummary | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, balance_cents, first_name, last_name")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load profile: ${error.message}`);
  }

  return data;
}

export function isProfileMissing(
  profile: ProfileSummary | null,
  user: User | null,
): boolean {
  return user !== null && profile === null;
}
