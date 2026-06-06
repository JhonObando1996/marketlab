import { describe, expect, it } from "vitest";

import {
  formatFakeBalanceAriaLabel,
  formatFakeBalanceCents,
} from "@/lib/auth/format-fake-balance";

describe("formatFakeBalanceCents", () => {
  it("formats workshop starting balance", () => {
    expect(formatFakeBalanceCents(1_000_000)).toBe("$10,000.00 fake");
  });

  it("formats zero balance", () => {
    expect(formatFakeBalanceCents(0)).toBe("$0.00 fake");
  });
});

describe("formatFakeBalanceAriaLabel", () => {
  it("includes fake cents in the accessible label", () => {
    expect(formatFakeBalanceAriaLabel(1_000)).toContain("1,000 fake cents");
    expect(formatFakeBalanceAriaLabel(1_000)).toContain("$10.00 fake");
  });
});
