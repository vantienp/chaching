"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { GrammarPoint } from "@/data/grammar";
import { ChevronDown, ChevronUp, BookOpen, CheckCircle, XCircle } from "lucide-react";
import { StickyNote } from "@/components/stationery/StickyNote";

interface GrammarCardProps {
  grammar: GrammarPoint;
  className?: string;
}

export function GrammarCard({ grammar, className }: GrammarCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
  };

  return (
    <div
      className={cn(
        "glass-card p-6 rounded-3xl border border-white/70 dark:border-white/10 shadow-lg space-y-4 transition-all duration-300",
        className
      )}
    >
      {/* Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-start justify-between gap-4 cursor-pointer select-none"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
              {grammar.level}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-content-main leading-snug">
              {grammar.title}
            </h3>
          </div>
          <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs sm:text-sm font-semibold text-amber-700 dark:text-amber-300 font-mono mt-1">
            {grammar.structure}
          </div>
        </div>

        <button
          aria-label={isExpanded ? "Thu gọn" : "Mở rộng"}
          className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-content-muted hover:text-content-main transition-colors shrink-0"
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      <p className="text-xs sm:text-sm text-content-muted leading-relaxed">
        {grammar.explanation}
      </p>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-200">
          {/* Examples */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Ví dụ minh họa:
            </span>
            <div className="space-y-2">
              {grammar.examples.map((ex, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-xs sm:text-sm space-y-0.5"
                >
                  <p className="font-hanzi font-bold text-content-main">
                    {ex.cn}
                  </p>
                  <p className="text-primary/80 font-medium">{ex.pinyin}</p>
                  <p className="text-content-muted">{ex.vi}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tips Sticky Note */}
          <StickyNote
            color="yellow"
            tilt="left"
            title="Mẹo nhớ nhanh của giáo viên"
          >
            {grammar.quickTips}
          </StickyNote>

          {/* Mini Practice Quiz */}
          <div className="p-4 rounded-2xl bg-sky-50/60 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase">
              <BookOpen className="w-4 h-4" />
              <span>Kiểm tra nhanh ngữ pháp</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-content-main">
              {grammar.quizQuestion.question}
            </p>

            <div className="space-y-2">
              {grammar.quizQuestion.options.map((opt, optIdx) => {
                let optStyle =
                  "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-content-main";
                if (isAnswered) {
                  if (optIdx === grammar.quizQuestion.correctIndex) {
                    optStyle =
                      "bg-emerald-500 text-white font-bold border-emerald-600";
                  } else if (optIdx === selectedOption) {
                    optStyle =
                      "bg-rose-500 text-white font-bold border-rose-600";
                  } else {
                    optStyle = "opacity-40 bg-slate-100 dark:bg-slate-800";
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleAnswer(optIdx)}
                    disabled={isAnswered}
                    className={cn(
                      "w-full p-2.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer",
                      optStyle
                    )}
                  >
                    <span>{opt}</span>
                    {isAnswered &&
                      optIdx === grammar.quizQuestion.correctIndex && (
                        <CheckCircle className="w-4 h-4 text-white shrink-0 ml-1" />
                      )}
                    {isAnswered &&
                      optIdx === selectedOption &&
                      optIdx !== grammar.quizQuestion.correctIndex && (
                        <XCircle className="w-4 h-4 text-white shrink-0 ml-1" />
                      )}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <p className="text-xs text-content-muted pt-1">
                {grammar.quizQuestion.explanation}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
