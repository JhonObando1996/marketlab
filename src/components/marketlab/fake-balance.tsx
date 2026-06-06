import {
  formatFakeBalanceAriaLabel,
  formatFakeBalanceCents,
} from "@/lib/auth/format-fake-balance";

export function FakeBalance({ balanceCents }: { balanceCents: number }) {
  return (
    <span
      role="status"
      className="inline-flex items-center rounded-lg border border-border bg-muted/50 px-2.5 py-1 font-mono text-xs font-medium text-foreground sm:text-sm"
      aria-label={formatFakeBalanceAriaLabel(balanceCents)}
    >
      {formatFakeBalanceCents(balanceCents)}
    </span>
  );
}
