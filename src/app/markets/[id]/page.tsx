import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BuyPlaceholder } from "@/components/marketlab/buy-placeholder";
import { PageShell } from "@/components/marketlab/header";
import {
  MarketCloseDate,
  MarketStatusBadge,
} from "@/components/marketlab/market-status-badge";
import { ProbabilityChart } from "@/components/marketlab/probability-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMarketSentiment } from "@/lib/supabase/queries/market-sentiment";
import {
  getMarketById,
  shouldShowMarketNotFound,
} from "@/lib/supabase/queries/markets";

export default async function MarketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const market = await getMarketById(id);

  if (shouldShowMarketNotFound(market)) {
    notFound();
  }

  const sentiment = await getMarketSentiment(market);

  return (
    <PageShell className="space-y-6">
      <Link
        href="/markets"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to markets
      </Link>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-2">
              <CardTitle className="text-2xl sm:text-3xl">
                {market.title}
              </CardTitle>
              <CardDescription className="max-w-3xl text-base">
                {market.description ?? "No description provided."}
              </CardDescription>
            </div>
            <MarketStatusBadge status={market.status} />
          </div>
        </CardHeader>
        <CardContent>
          <MarketCloseDate closeDate={market.close_date} />
        </CardContent>
      </Card>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Outcomes</CardTitle>
            <CardDescription>
              Binary Yes/No market. Trading controls arrive in a later workshop
              step.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Yes
              </p>
              <p className="mt-1 text-2xl font-semibold">
                {sentiment.yesChancePercent.toFixed(1)}%
              </p>
            </div>
            <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-4">
              <p className="text-sm font-medium text-rose-700 dark:text-rose-300">
                No
              </p>
              <p className="mt-1 text-2xl font-semibold">
                {(100 - sentiment.yesChancePercent).toFixed(1)}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Buy shares</CardTitle>
            <CardDescription>
              Placeholder only — no balance changes in this step.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BuyPlaceholder market={market} />
          </CardContent>
        </Card>
      </section>

      <ProbabilityChart
        points={sentiment.chartPoints}
        currentYesChance={sentiment.yesChancePercent}
        mode={sentiment.chartMode}
      />
    </PageShell>
  );
}
