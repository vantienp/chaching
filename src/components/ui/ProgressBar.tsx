"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  className,
  showLabel = false,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold text-content-muted">
          <span>Tiến độ</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className="w-full h-2.5 bg-slate-200/70 dark:bg-slate-700/60 rounded-full overflow-hidden p-0.5 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-primary to-sky-400 rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
