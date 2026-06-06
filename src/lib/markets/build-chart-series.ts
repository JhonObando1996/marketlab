import { computeYesChancePercent } from "@/lib/markets/compute-yes-chance";
import { parseTradeSide } from "@/lib/markets/parse-trade-side";
import type { ChartPoint, TradeLedgerEntry } from "@/lib/markets/types";

export function buildChartSeries(input: {
  trades: TradeLedgerEntry[];
  marketCreatedAt: string;
  now?: string;
  currentYesChancePercent: number;
}): { points: ChartPoint[]; mode: "history" | "flat_current" } {
  const now = input.now ?? new Date().toISOString();
  let yesTotal = 0;
  let noTotal = 0;
  const historyPoints: ChartPoint[] = [];

  for (const trade of input.trades) {
    const side = parseTradeSide(trade.description);
    if (!side) {
      continue;
    }

    const amount = Math.abs(trade.amount_cents);
    if (amount <= 0) {
      continue;
    }

    if (side === "yes") {
      yesTotal += amount;
    } else {
      noTotal += amount;
    }

    const { percent } = computeYesChancePercent({ yesTotal, noTotal });
    historyPoints.push({
      at: trade.created_at,
      yesChancePercent: percent,
    });
  }

  if (historyPoints.length >= 2) {
    return { points: historyPoints, mode: "history" };
  }

  return {
    points: [
      {
        at: input.marketCreatedAt,
        yesChancePercent: input.currentYesChancePercent,
      },
      { at: now, yesChancePercent: input.currentYesChancePercent },
    ],
    mode: "flat_current",
  };
}
