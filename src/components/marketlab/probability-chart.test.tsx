/**
 * @vitest-environment happy-dom
 */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProbabilityChart } from "@/components/marketlab/probability-chart";

describe("ProbabilityChart", () => {
  it("renders flat current-state chart copy", () => {
    render(
      <ProbabilityChart
        currentYesChance={50}
        mode="flat_current"
        points={[
          { at: "2026-01-01T00:00:00.000Z", yesChancePercent: 50 },
          { at: "2026-01-02T00:00:00.000Z", yesChancePercent: 50 },
        ]}
      />,
    );

    expect(
      screen.getByText(/Current market balance — no trade history yet/i),
    ).toBeTruthy();
    expect(
      screen.getByLabelText(/Yes probability chart at 50.0 percent/i),
    ).toBeTruthy();
    expect(screen.getByText("Current balance")).toBeTruthy();
  });

  it("renders history mode label", () => {
    render(
      <ProbabilityChart
        currentYesChance={75}
        mode="history"
        points={[
          { at: "2026-01-01T00:00:00.000Z", yesChancePercent: 60 },
          { at: "2026-01-02T00:00:00.000Z", yesChancePercent: 75 },
        ]}
      />,
    );

    expect(screen.getByText("Trade history")).toBeTruthy();
    expect(screen.getByText(/Current Yes chance: 75.0%/)).toBeTruthy();
  });
});
