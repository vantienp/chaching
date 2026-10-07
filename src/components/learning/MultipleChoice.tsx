"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

interface MultipleChoiceProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  onAnswer?: (isCorrect: boolean) => void;
  className?: string;
}

export function MultipleChoice({
  question,
  options,
  correctIndex,
  explanation,
  onAnswer,
  className,
}: MultipleChoiceProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (idx: number) => {
    if (submitted) return;
    setSelected(idx);
    setSubmitted(true);
    onAnswer?.(idx === correctIndex);
  };

  return (
    <div className={cn("glass-card p-6 rounded-3xl space-y-4", className)}>
      <h4 className="text-base font-bold text-content-main leading-snug">
        {question}
      </h4>

      <div className="space-y-2.5">
        {options.map((option, idx) => {
          let stateStyle = "bg-white/80 dark:bg-slate-800/80 hover:border-primary/50 text-content-main";
          if (submitted) {
            if (idx === correctIndex) {
              stateStyle = "bg-emerald-500 text-white font-bold border-emerald-600";
            } else if (idx === selected) {
              stateStyle = "bg-rose-500 text-white font-bold border-rose-600";
            } else {
              stateStyle = "opacity-40 bg-slate-100 dark:bg-slate-800";
            }
          }

          const optionLetters = ["A", "B", "C", "D"];

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={submitted}
              className={cn(
                "w-full p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 text-left text-sm font-medium transition-all flex items-center justify-between cursor-pointer",
                stateStyle
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                    submitted && idx === correctIndex
                      ? "bg-white text-emerald-600"
                      : "bg-slate-100 dark:bg-slate-700 text-content-muted"
                  )}
                >
                  {optionLetters[idx]}
                </span>
                <span>{option}</span>
              </div>

              {submitted && idx === correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-white shrink-0 ml-2" />
              )}
              {submitted && idx === selected && idx !== correctIndex && (
                <XCircle className="w-5 h-5 text-white shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {submitted && (
        <div className="pt-2 text-xs text-content-muted bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60 leading-relaxed">
          <span className="font-bold text-content-main">Giải thích: </span>
          {explanation}
        </div>
      )}
    </div>
  );
}
