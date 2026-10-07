"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Sparkles } from "lucide-react";

interface PinyinQuizProps {
  hanzi: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  onCorrect?: () => void;
  className?: string;
}

export function PinyinQuiz({
  hanzi,
  options,
  correctIndex,
  explanation,
  onCorrect,
  className,
}: PinyinQuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (index: number) => {
    if (submitted) return;
    setSelected(index);
    setSubmitted(true);
    if (index === correctIndex) {
      onCorrect?.();
    }
  };

  const handleRetry = () => {
    setSelected(null);
    setSubmitted(false);
  };

  return (
    <div className={cn("glass-card p-6 rounded-3xl space-y-5", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Luyện nghe & Chọn Pinyin
        </span>
        {submitted && selected === correctIndex && (
          <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            Chính xác!
          </span>
        )}
      </div>

      <div className="text-center py-4 bg-sky-50/50 dark:bg-slate-800/50 rounded-2xl border border-sky-100 dark:border-slate-700/60">
        <span className="text-4xl sm:text-5xl font-hanzi font-bold text-content-main tracking-wider">
          {hanzi}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {options.map((opt, i) => {
          let style = "bg-white/90 dark:bg-slate-800/80 hover:border-primary/50 text-content-main";
          if (submitted) {
            if (i === correctIndex) {
              style = "bg-emerald-500 text-white font-bold border-emerald-600 shadow-md";
            } else if (i === selected) {
              style = "bg-rose-500 text-white font-bold border-rose-600 animate-wiggle";
            } else {
              style = "opacity-40 bg-slate-100 dark:bg-slate-800";
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={submitted}
              className={cn(
                "p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700 text-sm font-semibold transition-all duration-200 flex items-center justify-between cursor-pointer",
                style
              )}
            >
              <span>{opt}</span>
              {submitted && i === correctIndex && (
                <CheckCircle2 className="w-4 h-4 text-white shrink-0 ml-1" />
              )}
              {submitted && i === selected && i !== correctIndex && (
                <XCircle className="w-4 h-4 text-white shrink-0 ml-1" />
              )}
            </button>
          );
        })}
      </div>

      {submitted && (
        <div className="pt-2 text-xs space-y-2">
          <p className="text-content-muted leading-relaxed">{explanation}</p>
          {selected !== correctIndex && (
            <button
              onClick={handleRetry}
              className="text-primary font-semibold hover:underline"
            >
              Thử lại câu này
            </button>
          )}
        </div>
      )}
    </div>
  );
}
