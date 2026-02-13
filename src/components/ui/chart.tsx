"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Simple chart system without Recharts.
 * Supports:
 * - Line charts
 * - Bar charts
 * - Custom colors
 * - Tooltip
 */

export interface ChartProps {
  data: { label: string; value: number }[];
  height?: number;
  className?: string;
  color?: string;
}

export function Chart({
  data,
  height = 200,
  className,
  color = "#3b82f6",
}: ChartProps) {
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((d.value - min) / (max - min)) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ height }}
        className="overflow-visible"
      >
        {/* Background grid */}
        <g stroke="#e5e7eb" strokeWidth="0.3">
          {[0, 25, 50, 75, 100].map((y) => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} />
          ))}
        </g>

        {/* Line */}
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          points={points}
        />

        {/* Dots */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y = 100 - ((d.value - min) / (max - min)) * 100;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="1.5"
              fill={color}
              className="transition-all"
            />
          );
        })}
      </svg>

      {/* Labels */}
      <div className="flex justify-between text-xs text-muted-foreground mt-2">
        {data.map((d, i) => (
          <span key={i}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}

/**
 * Bar chart version
 */

export interface BarChartProps {
  data: { label: string; value: number }[];
  height?: number;
  className?: string;
  color?: string;
}

export function BarChart({
  data,
  height = 200,
  className,
  color = "#3b82f6",
}: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-end gap-2" style={{ height }}>
        {data.map((d, i) => (
          <div key={i} className="flex flex-col items-center w-full">
            <div
              className="w-full rounded-t-md transition-all"
              style={{
                height: `${(d.value / max) * 100}%`,
                backgroundColor: color,
              }}
            />
            <span className="text-xs text-muted-foreground mt-1">
              {d.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}