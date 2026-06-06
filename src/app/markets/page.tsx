import { PageShell } from "@/components/marketlab/header";
import {
  MarketCard,
  MarketEmptyState,
} from "@/components/marketlab/market-card";
import { getMarkets } from "@/lib/supabase/queries/markets";

export default async function MarketsPage() {
  const markets = await getMarkets();

  return (
    <PageShell>
      <section className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Fake-money dashboard
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Browse fictional Yes/No markets using fake money.
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
            Explore workshop prediction markets, check close dates, and review
            current Yes probability before trading arrives in a later step.
          </p>
        </div>

        {markets.length === 0 ? (
          <MarketEmptyState />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {markets.map((market) => (
              <MarketCard key={market.id} market={market} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
