"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ChartPoint } from "@/lib/markets/types";
import { cn } from "@/lib/utils";

type RangeKey = "all" | "7d" | "24h";

const rangeLabels: Record<RangeKey, string> = {
  all: "All",
  "7d": "7D",
  "24h": "24H",
};

function filterPoints(
  points: ChartPoint[],
  range: RangeKey,
  now: Date,
): ChartPoint[] {
  if (range === "all" || points.length === 0) {
    return points;
  }

  const cutoffMs =
    range === "7d"
      ? now.getTime() - 7 * 24 * 60 * 60 * 1000
      : now.getTime() - 24 * 60 * 60 * 1000;

  const filtered = points.filter(
    (point) => new Date(point.at).getTime() >= cutoffMs,
  );

  return filtered.length >= 2 ? filtered : points;
}

function buildPath(
  points: ChartPoint[],
  width: number,
  height: number,
): string {
  if (points.length === 0) {
    return "";
  }

  const minTime = new Date(points[0]?.at ?? Date.now()).getTime();
  const maxTime = new Date(
    points[points.length - 1]?.at ?? Date.now(),
  ).getTime();
  const timeSpan = Math.max(maxTime - minTime, 1);

  return points
    .map((point, index) => {
      const x =
        ((new Date(point.at).getTime() - minTime) / timeSpan) * (width - 40) +
        32;
      const y = height - 24 - (point.yesChancePercent / 100) * (height - 48);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

export function ProbabilityChart({
  points,
  currentYesChance,
  mode,
}: {
  points: ChartPoint[];
  currentYesChance: number;
  mode: "history" | "flat_current";
}) {
  const [range, setRange] = useState<RangeKey>("all");
  const now = useMemo(() => new Date(), []);
  const filteredPoints = useMemo(
    () => filterPoints(points, range, now),
    [points, range, now],
  );

  const width = 640;
  const height = 240;
  const path = buildPath(filteredPoints, width, height);

  return (
    <Card>
      <CardHeader className="gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <CardTitle>Yes probability</CardTitle>
          <CardDescription>
            {mode === "history"
              ? "Estimated from recorded trade activity in the ledger."
              : "Current market balance — no trade history yet."}
          </CardDescription>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(Object.keys(rangeLabels) as RangeKey[]).map((key) => (
            <Button
              key={key}
              type="button"
              size="xs"
              variant={range === key ? "default" : "outline"}
              onClick={() => setRange(key)}
            >
              {rangeLabels[key]}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="font-medium text-foreground">
            Current Yes chance: {currentYesChance.toFixed(1)}%
          </span>
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-xs",
              mode === "history"
                ? "border-border bg-muted text-muted-foreground"
                : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
            )}
          >
            {mode === "history" ? "Trade history" : "Current balance"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="h-auto w-full min-w-[320px] text-muted-foreground"
            role="img"
            aria-label={`Yes probability chart at ${currentYesChance.toFixed(1)} percent`}
          >
            <title>Yes probability over time</title>
            {[0, 25, 50, 75, 100].map((tick) => {
              const y = height - 24 - (tick / 100) * (height - 48);
              return (
                <g key={tick}>
                  <line
                    x1="32"
                    x2={width - 8}
                    y1={y}
                    y2={y}
                    stroke="currentColor"
                    strokeOpacity="0.12"
                  />
                  <text x="4" y={y + 4} fontSize="10" fill="currentColor">
                    {tick}%
                  </text>
                </g>
              );
            })}
            <path
              d={path}
              fill="none"
              stroke="var(--chart-1)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
