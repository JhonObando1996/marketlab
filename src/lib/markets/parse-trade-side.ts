export type TradeSide = "yes" | "no";

export function parseTradeSide(description: string | null): TradeSide | null {
  if (!description) {
    return null;
  }

  const trimmed = description.trim();
  const lower = trimmed.toLowerCase();

  if (lower.startsWith("yes:") || lower.startsWith("yes ")) {
    return "yes";
  }

  if (lower.startsWith("no:") || lower.startsWith("no ")) {
    return "no";
  }

  if (trimmed.startsWith("{")) {
    try {
      const parsed = JSON.parse(trimmed) as { side?: string };
      if (parsed.side === "yes" || parsed.side === "no") {
        return parsed.side;
      }
    } catch {
      return null;
    }
  }

  return null;
}
