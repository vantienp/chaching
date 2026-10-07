"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { BarChart3, TrendingUp } from "lucide-react";

interface ProgressChartProps {
  className?: string;
}

export function ProgressChart({ className }: ProgressChartProps) {
  const [activeTab, setActiveTab] = useState<"week" | "month">("week");

  const weekData = [
    { label: "T2", words: 12, hours: 1.2 },
    { label: "T3", words: 18, hours: 2.0 },
    { label: "T4", words: 25, hours: 2.5 },
    { label: "T5", words: 15, hours: 1.5 },
    { label: "T6", words: 30, hours: 3.0 },
    { label: "T7", words: 35, hours: 3.5 },
    { label: "CN", words: 20, hours: 2.0 },
  ];

  const maxWords = 40;

  return (
    <div
      className={cn(
        "glass-card p-6 rounded-3xl border border-white/75 dark:border-white/10 shadow-lg space-y-4",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-base text-content-main">
            Tiến Độ Học Từ Vựng
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-full text-xs font-semibold">
          <button
            onClick={() => setActiveTab("week")}
            className={cn(
              "px-3 py-1 rounded-full transition-all",
              activeTab === "week"
                ? "bg-white dark:bg-slate-700 text-primary shadow-sm"
                : "text-content-muted hover:text-content-main"
            )}
          >
            Tuần này
          </button>
          <button
            onClick={() => setActiveTab("month")}
            className={cn(
              "px-3 py-1 rounded-full transition-all",
              activeTab === "month"
                ? "bg-white dark:bg-slate-700 text-primary shadow-sm"
                : "text-content-muted hover:text-content-main"
            )}
          >
            Tháng này
          </button>
        </div>
      </div>

      {/* SVG / Styled Bar Graph */}
      <div className="pt-4 pb-2">
        <div className="h-44 flex items-end justify-between gap-2 sm:gap-4 px-2 border-b border-slate-200/60 dark:border-slate-800">
          {weekData.map((d, i) => {
            const heightPercent = Math.round((d.words / maxWords) * 100);

            return (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
              >
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[11px] px-2 py-0.5 rounded-md pointer-events-none whitespace-nowrap shadow-md mb-1">
                  {d.words} từ ({d.hours}h)
                </div>

                {/* Animated bar */}
                <div className="w-full max-w-[36px] bg-slate-100 dark:bg-slate-800 rounded-t-xl overflow-hidden h-36 flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-primary to-sky-400 group-hover:from-primary-hover group-hover:to-sky-300 rounded-t-xl transition-all duration-500 shadow-sm"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                {/* Day label */}
                <span className="text-xs font-semibold text-content-muted group-hover:text-primary transition-colors">
                  {d.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-content-muted pt-1">
        <span className="flex items-center gap-1.5 font-medium">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          <span>Tăng 24% so với tuần trước</span>
        </span>
        <span className="font-semibold text-content-main">
          Tổng: 155 từ vựng mới
        </span>
      </div>
    </div>
  );
}
