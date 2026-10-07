"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface FillBlankExerciseProps {
  sentence: string; // "你好！我____越南人。"
  pinyin: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  onCorrect?: () => void;
  className?: string;
}

export function FillBlankExercise({
  sentence,
  pinyin,
  options,
  correctAnswer,
  explanation,
  onCorrect,
  className,
}: FillBlankExerciseProps) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (word: string) => {
    if (isSubmitted) return;
    setSelectedWord(word);
    setIsSubmitted(true);
    if (word === correctAnswer) {
      onCorrect?.();
    }
  };

  const handleReset = () => {
    setSelectedWord(null);
    setIsSubmitted(false);
  };

  const parts = sentence.split("____");

  return (
    <div className={cn("glass-card p-6 rounded-3xl space-y-5", className)}>
      <span className="text-xs font-bold uppercase tracking-wider text-primary block">
        Điền từ thích hợp vào chỗ trống
      </span>

      {/* Sentence with blank */}
      <div className="p-5 bg-white/70 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-2 text-center">
        <div className="text-xl sm:text-2xl font-hanzi font-bold text-content-main flex items-center justify-center flex-wrap gap-1">
          <span>{parts[0]}</span>
          <span
            className={cn(
              "inline-block min-w-[56px] px-2.5 py-1 mx-1 border-b-2 font-bold text-center transition-all",
              !selectedWord && "border-primary/60 text-transparent",
              isSubmitted && selectedWord === correctAnswer
                ? "border-emerald-500 text-emerald-600 bg-emerald-50/50 rounded-lg"
                : isSubmitted
                ? "border-rose-500 text-rose-600 bg-rose-50/50 rounded-lg"
                : "border-primary text-primary"
            )}
          >
            {selectedWord || "___"}
          </span>
          <span>{parts[1]}</span>
        </div>
        <p className="text-xs sm:text-sm text-primary/80 font-medium">
          {pinyin}
        </p>
      </div>

      {/* Word chips to choose from */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {options.map((opt) => {
          const isCorrect = isSubmitted && opt === correctAnswer;
          const isWrong = isSubmitted && selectedWord === opt && opt !== correctAnswer;

          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={isSubmitted}
              className={cn(
                "px-5 py-2.5 rounded-full font-hanzi text-lg font-bold border transition-all cursor-pointer shadow-sm select-none",
                !isSubmitted &&
                  "bg-white dark:bg-slate-800 text-content-main hover:border-primary hover:scale-105 active:scale-95",
                isCorrect && "bg-emerald-500 text-white border-emerald-600 shadow-md",
                isWrong && "bg-rose-500 text-white border-rose-600 animate-wiggle",
                isSubmitted && !isCorrect && !isWrong && "opacity-40 bg-slate-100 dark:bg-slate-800"
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Result feedback */}
      {isSubmitted && (
        <div className="text-xs text-content-muted pt-2 border-t border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4">
          <p className="leading-relaxed">{explanation}</p>
          {selectedWord !== correctAnswer && (
            <button
              onClick={handleReset}
              className="text-primary font-semibold hover:underline shrink-0"
            >
              Chọn lại
            </button>
          )}
        </div>
      )}
    </div>
  );
}
