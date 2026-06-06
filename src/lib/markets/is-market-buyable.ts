import type { MarketRow } from "@/lib/markets/types";

export function isMarketBuyable(
  market: Pick<MarketRow, "status" | "close_date">,
  now: Date = new Date(),
): boolean {
  if (market.status !== "open") {
    return false;
  }

  return new Date(market.close_date) > now;
}
