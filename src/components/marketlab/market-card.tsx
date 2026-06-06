import { ArrowRight, BarChart3 } from "lucide-react";
import Link from "next/link";

import {
  MarketCloseDate,
  MarketStatusBadge,
} from "@/components/marketlab/market-status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { MarketRow } from "@/lib/markets/types";

export function MarketCard({ market }: { market: MarketRow }) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-balance">{market.title}</CardTitle>
          <MarketStatusBadge status={market.status} />
        </div>
        {market.description ? (
          <CardDescription className="line-clamp-3">
            {market.description}
          </CardDescription>
        ) : (
          <CardDescription>No description provided.</CardDescription>
        )}
      </CardHeader>
      <CardContent className="mt-auto">
        <MarketCloseDate closeDate={market.close_date} />
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/markets/${market.id}`}>
            View market
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function MarketEmptyState() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <BarChart3
            className="size-6 text-muted-foreground"
            aria-hidden="true"
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">No markets yet</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Fictional Yes/No markets will appear here once they exist in
            Supabase. Add markets from Supabase Studio to start browsing with
            fake money.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
