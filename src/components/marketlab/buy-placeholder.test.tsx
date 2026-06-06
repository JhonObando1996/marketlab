/**
 * @vitest-environment happy-dom
 */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BuyPlaceholder } from "@/components/marketlab/buy-placeholder";

const baseMarket = {
  id: "market-1",
  title: "Test market",
  description: "Description",
  status: "open" as const,
  close_date: "2026-12-31T00:00:00.000Z",
  created_at: "2026-01-01T00:00:00.000Z",
  updated_at: "2026-01-01T00:00:00.000Z",
};

describe("BuyPlaceholder", () => {
  it("shows buying unavailable for closed markets", () => {
    render(
      <BuyPlaceholder
        market={{
          ...baseMarket,
          status: "closed",
          close_date: "2020-01-01T00:00:00.000Z",
        }}
      />,
    );

    const button = screen.getByRole("button", {
      name: "Buying unavailable",
    }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it("shows trading coming soon for open markets", () => {
    render(<BuyPlaceholder market={baseMarket} />);

    const button = screen.getByRole("button", {
      name: "Trading coming soon",
    }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });
});
