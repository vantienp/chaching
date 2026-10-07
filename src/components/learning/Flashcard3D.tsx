"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { VocabularyWord } from "@/data/vocabulary";
import { WashiTape } from "@/components/stationery/WashiTape";
import { Volume2, RotateCcw, Sparkles, CheckCircle2, ChevronRight, BookOpen } from "lucide-react";

interface Flashcard3DProps {
  word: VocabularyWord;
  className?: string;
  onMastered?: () => void;
}

export function Flashcard3D({ word, className, onMastered }: Flashcard3DProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Handle keyboard spacebar to flip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Pronunciation audio using Web Speech API
  const handlePlayAudio = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlayingAudio(true);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word.hanzi);
      utterance.lang = "zh-CN";
      utterance.rate = 0.85;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 1200);
    }
  };

  // Mouse move 3D tilt effect (smooth spatial reaction)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className={cn("w-full flex flex-col items-center gap-5", className)}>
      {/* ==================== 1. 3D CARD STAGE ==================== */}
      <div
        className="w-full max-w-[460px] sm:max-w-[480px] h-[500px] sm:h-[520px] cursor-pointer group select-none relative"
        style={{
          perspective: "1200px",
          width: "100%",
          maxWidth: "480px",
          height: "520px",
        }}
        onClick={() => setIsFlipped(!isFlipped)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={0}
        aria-label={`Thẻ từ vựng ${word.hanzi}. Nhấn phím cách hoặc click để lật thẻ.`}
      >
        <div
          className="w-full h-full relative transition-transform duration-700 rounded-3xl shadow-2xl"
          style={{
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
            transform: `rotateY(${isFlipped ? 180 : 0}deg) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          {/* ==================== FRONT FACE ==================== */}
          <div
            className="absolute inset-0 w-full h-full p-6 sm:p-8 flex flex-col justify-between items-center text-center shadow-xl border border-white/80 dark:border-white/10 rounded-3xl overflow-hidden bg-gradient-to-b from-white/95 via-white/90 to-sky-50/80 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-800/80"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {/* Washi Tape Header */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
              <WashiTape color="amber" />
            </div>

            {/* Top Bar Info */}
            <div className="w-full flex justify-between items-center text-xs font-semibold text-content-muted mt-2">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold">
                {word.level}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-content-muted">
                Bộ thủ: {word.radical} • {word.strokeCount} nét
              </span>
            </div>

            {/* Core Hanzi & Pinyin Showcase */}
            <div className="my-auto space-y-4 py-4">
              <h2 className="text-7xl sm:text-8xl font-black font-hanzi text-content-main tracking-wider drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
                {word.hanzi}
              </h2>
              <p className="text-2xl sm:text-3xl font-bold text-primary tracking-wide">
                {word.pinyin}
              </p>
              <p className="text-sm font-semibold text-content-muted">
                [ {word.meaning_hv} ]
              </p>
            </div>

            {/* Front Bottom Action Bar */}
            <div className="w-full flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <button
                type="button"
                onClick={handlePlayAudio}
                className={cn(
                  "px-4 py-2 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white transition-all shadow-xs flex items-center gap-2 text-xs font-bold cursor-pointer",
                  isPlayingAudio && "bg-primary text-white scale-105"
                )}
                aria-label="Nghe phát âm chuẩn Bắc Kinh"
              >
                <Volume2 className={cn("w-4 h-4", isPlayingAudio && "animate-pulse")} />
                <span>{isPlayingAudio ? "Đang phát..." : "Phát âm"}</span>
              </button>

              <div className="text-xs text-content-muted flex items-center gap-1.5 opacity-80">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Nhấn Space hoặc Click để lật</span>
              </div>
            </div>
          </div>

          {/* ==================== BACK FACE ==================== */}
          <div
            className="absolute inset-0 w-full h-full p-6 sm:p-8 flex flex-col justify-between text-left shadow-xl border border-white/80 dark:border-white/10 rounded-3xl overflow-hidden bg-gradient-to-b from-white/95 via-white/90 to-amber-50/70 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-800/80"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Washi Tape Header */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
              <WashiTape color="rose" />
            </div>

            {/* Meanings Section */}
            <div className="mt-2 space-y-2 shrink-0">
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  Nghĩa:
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-content-main">
                  {word.meaning_vi}
                </span>
              </div>
              <div className="text-xs text-content-muted font-medium">
                Âm Hán Việt:{" "}
                <span className="font-bold text-content-main">
                  {word.meaning_hv}
                </span>{" "}
                • Bộ: {word.radical} ({word.radicalMeaning})
              </div>
            </div>

            {/* Conversation Examples Box */}
            <div className="my-auto py-2 space-y-2.5 overflow-y-auto max-h-[200px] pr-1">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                Ví Dụ Đàm Thoại:
              </span>
              {word.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 text-xs sm:text-sm space-y-1 shadow-xs"
                >
                  <p className="font-hanzi font-bold text-content-main">
                    {ex.cn}
                  </p>
                  <p className="text-xs text-primary font-medium">{ex.pinyin}</p>
                  <p className="text-xs text-content-muted">{ex.vi}</p>
                </div>
              ))}
            </div>

            {/* Back Face Action Bar (Always Anchored at Bottom) */}
            <div className="w-full flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onMastered?.();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all text-xs shadow-md active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Đã thuộc từ này</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="text-xs font-semibold text-content-muted hover:text-primary flex items-center gap-1.5 transition-colors cursor-pointer py-1.5 px-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Lật lại mặt trước</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== 2. EXTERNAL ACTION TOOLBAR (EASY ACCESS) ==================== */}
      <div className="w-full max-w-[480px] flex items-center justify-between gap-3 px-2">
        <button
          type="button"
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex-1 py-2.5 px-4 rounded-full glass-card border border-white/80 dark:border-white/10 hover:border-primary/50 text-content-main font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-primary" />
          <span>{isFlipped ? "Xem mặt trước (Chữ Hán)" : "Lật xem nghĩa (Space)"}</span>
        </button>

        <button
          type="button"
          onClick={() => handlePlayAudio()}
          className="py-2.5 px-4 rounded-full glass-card border border-white/80 dark:border-white/10 hover:border-primary/50 text-content-main font-bold text-xs flex items-center gap-2 shadow-sm hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
          title="Nghe phát âm chuẩn"
        >
          <Volume2 className={cn("w-4 h-4 text-primary", isPlayingAudio && "animate-pulse")} />
          <span>Phát âm</span>
        </button>

        <button
          type="button"
          onClick={() => onMastered?.()}
          className="py-2.5 px-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
          title="Đánh dấu đã thuộc"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span className="hidden sm:inline">Đã thuộc</span>
        </button>
      </div>
    </div>
  );
}
