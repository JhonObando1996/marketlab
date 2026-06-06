/**
 * @vitest-environment happy-dom
 */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");

  return {
    ...actual,
    useActionState: () =>
      [{ needsEmailConfirmation: true }, vi.fn(), false] as const,
  };
});

vi.mock("@/lib/auth/actions", () => ({
  signUp: vi.fn(),
}));

import { SignUpForm } from "@/components/marketlab/sign-up-form";

afterEach(() => {
  cleanup();
});

describe("SignUpForm", () => {
  it("shows check your email state after signup without a session", () => {
    render(<SignUpForm />);

    expect(screen.getByText("Check your email")).toBeTruthy();
    expect(
      screen.getByText(/We sent a confirmation link to your inbox/i),
    ).toBeTruthy();
    expect(screen.getByRole("link", { name: "Go to sign in" })).toBeTruthy();
    expect(screen.queryByLabelText("Email")).toBeNull();
  });
});
