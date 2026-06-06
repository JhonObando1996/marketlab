/**
 * @vitest-environment happy-dom
 */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/actions", () => ({
  signOut: vi.fn(),
}));

import { HeaderAuthControls } from "@/components/marketlab/header-auth-controls";
import { ThemeToggle } from "@/components/marketlab/theme-toggle";

afterEach(() => {
  cleanup();
});

describe("HeaderAuthControls", () => {
  it("renders sign-in and sign-up actions when signed out", () => {
    render(
      <HeaderAuthControls user={null} profile={null} profileMissing={false} />,
    );

    expect(screen.getByRole("link", { name: "Sign in" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Sign up" })).toBeTruthy();
  });

  it("renders fake balance and sign-out when signed in", () => {
    render(
      <HeaderAuthControls
        user={{ id: "user-1", email: "user@example.com" }}
        profile={{
          id: "user-1",
          balance_cents: 1_000_000,
          first_name: "Ada",
          last_name: "Lovelace",
        }}
        profileMissing={false}
      />,
    );

    expect(screen.getByText("$10,000.00 fake")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Sign out" })).toBeTruthy();
    expect(screen.queryByRole("link", { name: "Sign in" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Sign up" })).toBeNull();
  });

  it("shows unavailable balance when profile is missing", () => {
    render(
      <HeaderAuthControls
        user={{ id: "user-1", email: "user@example.com" }}
        profile={null}
        profileMissing={true}
      />,
    );

    expect(screen.getByText("Balance unavailable")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Sign out" })).toBeTruthy();
  });

  it("does not render an editable balance control", () => {
    render(
      <HeaderAuthControls
        user={{ id: "user-1", email: "user@example.com" }}
        profile={{
          id: "user-1",
          balance_cents: 1_000_000,
          first_name: "Ada",
          last_name: "Lovelace",
        }}
        profileMissing={false}
      />,
    );

    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByRole("spinbutton")).toBeNull();
  });
});

describe("Header auth + theme", () => {
  it("keeps theme toggle available alongside auth controls", () => {
    render(
      <div className="flex items-center gap-3">
        <HeaderAuthControls user={null} profile={null} profileMissing={false} />
        <ThemeToggle />
      </div>,
    );

    expect(screen.getByRole("button", { name: /theme/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Sign in" })).toBeTruthy();
  });
});
