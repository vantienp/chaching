"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon: ReactNode;
  trend?: string;
  trendPositive?: boolean;
  color?: "sky" | "amber" | "emerald" | "rose" | "purple";
  className?: string;
}

export function StatCard({
  title,
  value,
  subValue,
  icon,
  trend,
  trendPositive = true,
  color = "sky",
  className,
}: StatCardProps) {
  const colorBgs = {
    sky: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/20",
    amber: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
    emerald: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    rose: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/20",
    purple: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/20",
  };

  return (
    <div
      className={cn(
        "glass-card p-5 sm:p-6 rounded-3xl border border-white/75 dark:border-white/10 shadow-lg flex items-center justify-between gap-4 transition-all hover:scale-[1.02]",
        className
      )}
    >
      <div className="space-y-1">
        <p className="text-xs font-semibold text-content-muted uppercase tracking-wider">
          {title}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-content-main tracking-tight">
            {value}
          </span>
          {subValue && (
            <span className="text-xs text-content-muted font-medium">
              {subValue}
            </span>
          )}
        </div>
        {trend && (
          <p
            className={cn(
              "text-xs font-semibold flex items-center gap-1",
              trendPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600"
            )}
          >
            <span>{trendPositive ? "↑" : "↓"}</span>
            <span>{trend}</span>
          </p>
        )}
      </div>

      <div
        className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 shadow-inner",
          colorBgs[color]
        )}
      >
        {icon}
      </div>
    </div>
  );
}
