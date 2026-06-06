import { describe, expect, it } from "vitest";

import {
  computeYesChancePercent,
  NEUTRAL_YES_CHANCE_PERCENT,
} from "@/lib/markets/compute-yes-chance";

describe("computeYesChancePercent", () => {
  it("returns aggregated yes chance from position totals", () => {
    const result = computeYesChancePercent({ yesTotal: 300, noTotal: 100 });
    expect(result.source).toBe("aggregated");
    expect(result.percent).toBe(75);
  });

  it("returns neutral 50% when totals are unavailable", () => {
    const result = computeYesChancePercent(null);
    expect(result.source).toBe("neutral");
    expect(result.percent).toBe(NEUTRAL_YES_CHANCE_PERCENT);
  });

  it("returns neutral 50% when the pool is empty", () => {
    const result = computeYesChancePercent({ yesTotal: 0, noTotal: 0 });
    expect(result.source).toBe("neutral");
    expect(result.percent).toBe(50);
  });
});
