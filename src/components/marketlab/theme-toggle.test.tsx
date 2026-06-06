/**
 * @vitest-environment happy-dom
 */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ThemeToggle } from "@/components/marketlab/theme-toggle";

describe("ThemeToggle", () => {
  it("renders theme toggle button", () => {
    render(<ThemeToggle />);

    expect(screen.getByRole("button", { name: /theme/i })).toBeTruthy();
  });
});
