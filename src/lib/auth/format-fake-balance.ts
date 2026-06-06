const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const centsFormatter = new Intl.NumberFormat("en-US");

export function formatFakeBalanceCents(balanceCents: number): string {
  const dollars = balanceCents / 100;
  return `${currencyFormatter.format(dollars)} fake`;
}

export function formatFakeBalanceAriaLabel(balanceCents: number): string {
  return `${centsFormatter.format(balanceCents)} fake cents (${formatFakeBalanceCents(balanceCents)})`;
}
