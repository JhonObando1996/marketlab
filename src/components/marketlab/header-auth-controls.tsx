import Link from "next/link";

import { FakeBalance } from "@/components/marketlab/fake-balance";
import { SignOutButton } from "@/components/marketlab/sign-out-button";
import { Button } from "@/components/ui/button";
import type { ProfileSummary } from "@/lib/supabase/queries/profile";

type HeaderAuthControlsProps = {
  user: { id: string; email?: string } | null;
  profile: ProfileSummary | null;
  profileMissing: boolean;
};

export function HeaderAuthControls({
  user,
  profile,
  profileMissing,
}: HeaderAuthControlsProps) {
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button asChild variant="outline" size="sm">
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {profile ? (
        <FakeBalance balanceCents={profile.balance_cents} />
      ) : profileMissing ? (
        <span className="text-xs text-muted-foreground sm:text-sm">
          Balance unavailable
        </span>
      ) : null}
      <SignOutButton />
    </div>
  );
}
