import {
  formatCloseDate,
  formatMarketStatus,
  statusBadgeClassName,
} from "@/lib/markets/format-market";
import type { MarketStatus } from "@/lib/markets/types";
import { cn } from "@/lib/utils";

export function MarketStatusBadge({
  status,
  className,
}: {
  status: MarketStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        statusBadgeClassName(status),
        className,
      )}
    >
      {formatMarketStatus(status)}
    </span>
  );
}

export function MarketCloseDate({
  closeDate,
  className,
}: {
  closeDate: string;
  className?: string;
}) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      Closes {formatCloseDate(closeDate)}
    </p>
  );
}
