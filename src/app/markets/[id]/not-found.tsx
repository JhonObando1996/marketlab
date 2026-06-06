import Link from "next/link";

import { PageShell } from "@/components/marketlab/header";
import { Button } from "@/components/ui/button";

export default function MarketNotFound() {
  return (
    <PageShell>
      <div className="mx-auto max-w-lg space-y-4 text-center">
        <h1 className="text-2xl font-semibold">Market not found</h1>
        <p className="text-muted-foreground">
          This market does not exist or is no longer available.
        </p>
        <Button asChild>
          <Link href="/markets">Back to markets</Link>
        </Button>
      </div>
    </PageShell>
  );
}
