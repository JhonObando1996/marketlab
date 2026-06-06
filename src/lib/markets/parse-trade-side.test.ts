import { describe, expect, it } from "vitest";

import { parseTradeSide } from "@/lib/markets/parse-trade-side";

describe("parseTradeSide", () => {
  it("parses yes/no prefixes", () => {
    expect(parseTradeSide("yes: buy shares")).toBe("yes");
    expect(parseTradeSide("no: buy shares")).toBe("no");
  });

  it("parses json side metadata", () => {
    expect(parseTradeSide('{"side":"yes"}')).toBe("yes");
  });
});
