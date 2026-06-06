import { Button } from "@/components/ui/button";
import { isMarketBuyable } from "@/lib/markets/is-market-buyable";
import type { MarketRow } from "@/lib/markets/types";

export function BuyPlaceholder({ market }: { market: MarketRow }) {
  const buyable = isMarketBuyable(market);

  return (
    <div className="space-y-3">
      <Button type="button" disabled className="w-full sm:w-auto">
        {buyable ? "Trading coming soon" : "Buying unavailable"}
      </Button>
      <p className="text-sm text-muted-foreground">
        {buyable
          ? "Buying and selling will be added in a later workshop step."
          : "This market is closed, resolved, or past its close date."}
      </p>
    </div>
  );
}
