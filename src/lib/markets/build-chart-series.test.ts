import { describe, expect, it } from "vitest";

import { buildChartSeries } from "@/lib/markets/build-chart-series";
import { NEUTRAL_YES_CHANCE_PERCENT } from "@/lib/markets/compute-yes-chance";

describe("buildChartSeries", () => {
  it("builds history when enough parseable trades exist", () => {
    const result = buildChartSeries({
      marketCreatedAt: "2026-01-01T00:00:00.000Z",
      now: "2026-01-03T00:00:00.000Z",
      currentYesChancePercent: 66.66666666666666,
      trades: [
        {
          created_at: "2026-01-01T12:00:00.000Z",
          amount_cents: 100,
          description: "yes: buy",
        },
        {
          created_at: "2026-01-02T12:00:00.000Z",
          amount_cents: 50,
          description: "no: buy",
        },
      ],
    });

    expect(result.mode).toBe("history");
    expect(result.points).toHaveLength(2);
    expect(result.points[0]?.yesChancePercent).toBe(100);
    expect(result.points[1]?.yesChancePercent).toBeCloseTo(66.666, 2);
  });

  it("falls back to a flat current-state line without trade history", () => {
    const result = buildChartSeries({
      marketCreatedAt: "2026-01-01T00:00:00.000Z",
      now: "2026-01-02T00:00:00.000Z",
      currentYesChancePercent: NEUTRAL_YES_CHANCE_PERCENT,
      trades: [],
    });

    expect(result.mode).toBe("flat_current");
    expect(result.points).toEqual([
      { at: "2026-01-01T00:00:00.000Z", yesChancePercent: 50 },
      { at: "2026-01-02T00:00:00.000Z", yesChancePercent: 50 },
    ]);
  });
});
