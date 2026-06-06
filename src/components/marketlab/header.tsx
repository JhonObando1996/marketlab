import Link from "next/link";

import { ThemeToggle } from "@/components/marketlab/theme-toggle";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/markets"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            MarketLab
          </Link>
          <nav aria-label="Main">
            <Link
              href="/markets"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Markets
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Auth controls will live here in a later workshop step. */}
          <div className="hidden sm:block" aria-hidden="true" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        "mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6",
        className,
      )}
    >
      {children}
    </main>
  );
}
