import { describe, expect, it } from "vitest";

import { shouldShowMarketNotFound } from "@/lib/supabase/queries/markets";

describe("shouldShowMarketNotFound", () => {
  it("returns true when market is missing", () => {
    expect(shouldShowMarketNotFound(null)).toBe(true);
  });

  it("returns false when market exists", () => {
    expect(
      shouldShowMarketNotFound({
        id: "market-1",
        title: "Test",
        description: null,
        status: "open",
        close_date: "2026-12-31T00:00:00.000Z",
        created_at: "2026-01-01T00:00:00.000Z",
        updated_at: "2026-01-01T00:00:00.000Z",
      }),
    ).toBe(false);
  });
});
