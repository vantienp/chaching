"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Flame, CheckCircle2, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { StampSeal } from "@/components/stationery/StampSeal";

interface StreakCounterProps {
  initialStreak?: number;
  className?: string;
}

export function StreakCounter({
  initialStreak = 15,
  className,
}: StreakCounterProps) {
  const [streak, setStreak] = useState(initialStreak);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [showSeal, setShowSeal] = useState(false);

  const days = [
    { label: "T2", checked: true },
    { label: "T3", checked: true },
    { label: "T4", checked: true },
    { label: "T5", checked: true },
    { label: "T6", checked: true },
    { label: "T7", checked: true },
    { label: "CN", checked: hasCheckedIn },
  ];

  const handleCheckIn = () => {
    if (hasCheckedIn) return;
    setStreak((prev) => prev + 1);
    setHasCheckedIn(true);
    setShowSeal(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#0ea5e9", "#f59e0b", "#ec4899", "#10b981"],
      });
    } catch (e) {
      // canvas-confetti fallback
    }

    setTimeout(() => {
      setShowSeal(false);
    }, 3500);
  };

  return (
    <div
      className={cn(
        "glass-card p-6 rounded-3xl border border-white/75 dark:border-white/10 shadow-lg relative overflow-hidden space-y-4",
        className
      )}
    >
      {/* Decorative seal popup */}
      {showSeal && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 dark:bg-slate-900/80 backdrop-blur-sm animate-in zoom-in-75 duration-300">
          <StampSeal variant="checked" />
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/20 text-amber-500 flex items-center justify-center shadow-inner">
            <Flame className="w-6 h-6 fill-current animate-bounce" />
          </div>
          <div>
            <span className="text-xs font-bold text-content-muted uppercase tracking-wider block">
              Chuỗi Ngày Học (Streak)
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-content-main">
                {streak}
              </span>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                ngày liên tục 🔥
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleCheckIn}
          disabled={hasCheckedIn}
          className={cn(
            "px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1.5",
            hasCheckedIn
              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 cursor-default"
              : "bg-amber-500 text-slate-950 hover:bg-amber-400 active:scale-95 shadow-[0_4px_12px_rgba(245,158,11,0.25)]"
          )}
        >
          {hasCheckedIn ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Đã điểm danh</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Điểm danh ngay</span>
            </>
          )}
        </button>
      </div>

      {/* Week circles */}
      <div className="grid grid-cols-7 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        {days.map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <span className="text-[11px] font-semibold text-content-muted">
              {day.label}
            </span>
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border",
                day.checked
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-content-muted border-slate-200 dark:border-slate-700"
              )}
            >
              {day.checked ? "✔" : "•"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
