/**
 * @vitest-environment happy-dom
 */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  MarketCard,
  MarketEmptyState,
} from "@/components/marketlab/market-card";

describe("MarketCard", () => {
  it("renders market details and detail link", () => {
    render(
      <MarketCard
        market={{
          id: "market-1",
          title: "Will it rain?",
          description: "A fictional weather market.",
          status: "open",
          close_date: "2026-12-31T18:00:00.000Z",
          created_at: "2026-01-01T00:00:00.000Z",
          updated_at: "2026-01-01T00:00:00.000Z",
        }}
      />,
    );

    expect(screen.getByText("Will it rain?")).toBeTruthy();
    expect(screen.getByText("A fictional weather market.")).toBeTruthy();
    expect(screen.getByText("Open")).toBeTruthy();
    expect(
      screen.getByRole("link", { name: /view market/i }).getAttribute("href"),
    ).toBe("/markets/market-1");
  });
});

describe("MarketEmptyState", () => {
  it("renders empty state copy", () => {
    render(<MarketEmptyState />);

    expect(screen.getByText("No markets yet")).toBeTruthy();
    expect(
      screen.getByText(/Fictional Yes\/No markets will appear here/i),
    ).toBeTruthy();
  });
});
