"use client";

export const THEME_STORAGE_KEY = "marketlab-theme";

export type ThemePreference = "light" | "dark" | "system";

export function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function resolveTheme(preference: ThemePreference): "light" | "dark" {
  if (preference === "system") {
    return getSystemTheme();
  }

  return preference;
}

export function applyTheme(preference: ThemePreference) {
  const resolved = resolveTheme(preference);
  document.documentElement.classList.toggle("dark", resolved === "dark");
  document.documentElement.dataset.theme = preference;
}

export function readStoredTheme(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }

  return "system";
}

export function storeTheme(preference: ThemePreference) {
  window.localStorage.setItem(THEME_STORAGE_KEY, preference);
}

export function cycleThemePreference(
  current: ThemePreference,
): ThemePreference {
  if (current === "system") {
    return "light";
  }

  if (current === "light") {
    return "dark";
  }

  return "system";
}
