import type { PositionTotals } from "@/lib/markets/types";

export const NEUTRAL_YES_CHANCE_PERCENT = 50;

export function computeYesChancePercent(
  totals: PositionTotals | null | undefined,
): { percent: number; source: "aggregated" | "neutral" } {
  if (!totals) {
    return { percent: NEUTRAL_YES_CHANCE_PERCENT, source: "neutral" };
  }

  const { yesTotal, noTotal } = totals;
  const pool = yesTotal + noTotal;

  if (pool <= 0) {
    return { percent: NEUTRAL_YES_CHANCE_PERCENT, source: "neutral" };
  }

  return {
    percent: (yesTotal / pool) * 100,
    source: "aggregated",
  };
}
