"use client";

import { useEffect } from "react";

import { applyTheme, readStoredTheme } from "@/lib/theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    applyTheme(readStoredTheme());

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (readStoredTheme() === "system") {
        applyTheme("system");
      }
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return children;
}
