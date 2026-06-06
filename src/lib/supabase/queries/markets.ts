import type { MarketRow } from "@/lib/markets/types";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getMarkets(): Promise<MarketRow[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("markets")
    .select("*")
    .order("close_date", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []) as MarketRow[];
}

export async function getMarketById(id: string): Promise<MarketRow | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("markets")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (data ?? null) as MarketRow | null;
}

export function shouldShowMarketNotFound(
  market: MarketRow | null,
): market is null {
  return market === null;
}
