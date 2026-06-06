"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  applyTheme,
  cycleThemePreference,
  readStoredTheme,
  storeTheme,
  type ThemePreference,
} from "@/lib/theme";

const labels: Record<ThemePreference, string> = {
  light: "Light mode",
  dark: "Dark mode",
  system: "System theme",
};

function ThemeIcon({ preference }: { preference: ThemePreference }) {
  if (preference === "dark") {
    return <Moon aria-hidden="true" />;
  }

  if (preference === "light") {
    return <Sun aria-hidden="true" />;
  }

  return <Monitor aria-hidden="true" />;
}

export function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("system");

  useEffect(() => {
    setPreference(readStoredTheme());
  }, []);

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      aria-label={labels[preference]}
      title={labels[preference]}
      onClick={() => {
        const next = cycleThemePreference(preference);
        setPreference(next);
        storeTheme(next);
        applyTheme(next);
      }}
    >
      <ThemeIcon preference={preference} />
    </Button>
  );
}
