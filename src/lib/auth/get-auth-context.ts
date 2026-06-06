import type { User } from "@supabase/supabase-js";
import {
  getProfileForUser,
  isProfileMissing,
  type ProfileSummary,
} from "@/lib/supabase/queries/profile";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type AuthContext = {
  user: User | null;
  profile: ProfileSummary | null;
  profileMissing: boolean;
};

export async function getAuthContext(): Promise<AuthContext> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      user: null,
      profile: null,
      profileMissing: false,
    };
  }

  const profile = await getProfileForUser(supabase, user.id);

  return {
    user,
    profile,
    profileMissing: isProfileMissing(profile, user),
  };
}
