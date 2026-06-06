import { describe, expect, it } from "vitest";

describe("hero image cleanup", () => {
  it("does not reference removed template images in app routes", async () => {
    const homeModule = await import("@/app/page");
    const homeSource = homeModule.default.toString();
    expect(homeSource).not.toContain("quito.png");
    expect(homeSource).not.toContain("hero2-bg.webp");
  });
});
