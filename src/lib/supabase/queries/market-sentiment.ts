import { buildChartSeries } from "@/lib/markets/build-chart-series";
import { computeYesChancePercent } from "@/lib/markets/compute-yes-chance";
import type {
  MarketRow,
  MarketSentiment,
  PositionTotals,
} from "@/lib/markets/types";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

async function fetchPositionTotals(
  marketId: string,
): Promise<PositionTotals | null> {
  const admin = createAdminSupabaseClient();
  if (!admin) {
    return null;
  }

  const { data, error } = await admin
    .from("positions")
    .select("yes_shares_cents, no_shares_cents")
    .eq("market_id", marketId);

  if (error || !data) {
    return null;
  }

  return data.reduce<PositionTotals>(
    (totals, row) => ({
      yesTotal: totals.yesTotal + row.yes_shares_cents,
      noTotal: totals.noTotal + row.no_shares_cents,
    }),
    { yesTotal: 0, noTotal: 0 },
  );
}

async function fetchTradeEntries(marketId: string) {
  const admin = createAdminSupabaseClient();
  if (!admin) {
    return [];
  }

  const { data, error } = await admin
    .from("ledger_entries")
    .select("created_at, amount_cents, description")
    .eq("market_id", marketId)
    .eq("entry_type", "trade")
    .order("created_at", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data;
}

export async function getMarketSentiment(
  market: Pick<MarketRow, "id" | "created_at">,
): Promise<MarketSentiment> {
  const totals = await fetchPositionTotals(market.id);
  const { percent, source } = computeYesChancePercent(totals);
  const trades = await fetchTradeEntries(market.id);
  const { points, mode } = buildChartSeries({
    trades,
    marketCreatedAt: market.created_at,
    currentYesChancePercent: percent,
  });

  return {
    yesChancePercent: percent,
    source,
    chartPoints: points,
    chartMode: mode,
  };
}
