export type MarketStatus = "open" | "closed" | "resolved";

export type MarketRow = {
  id: string;
  title: string;
  description: string | null;
  status: MarketStatus;
  close_date: string;
  created_at: string;
  updated_at: string;
};

export type ChartPoint = {
  at: string;
  yesChancePercent: number;
};

export type MarketSentiment = {
  yesChancePercent: number;
  source: "aggregated" | "neutral";
  chartPoints: ChartPoint[];
  chartMode: "history" | "flat_current";
};

export type TradeLedgerEntry = {
  created_at: string;
  amount_cents: number;
  description: string | null;
};

export type PositionTotals = {
  yesTotal: number;
  noTotal: number;
};
