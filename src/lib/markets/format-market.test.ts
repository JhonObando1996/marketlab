import { describe, expect, it } from "vitest";

import {
  formatCloseDate,
  formatMarketStatus,
} from "@/lib/markets/format-market";

describe("formatMarket", () => {
  it("formats market status labels", () => {
    expect(formatMarketStatus("open")).toBe("Open");
    expect(formatMarketStatus("closed")).toBe("Closed");
    expect(formatMarketStatus("resolved")).toBe("Resolved");
  });

  it("formats close dates", () => {
    const formatted = formatCloseDate("2026-12-31T18:00:00.000Z", "en-US");
    expect(formatted).toContain("2026");
  });
});
