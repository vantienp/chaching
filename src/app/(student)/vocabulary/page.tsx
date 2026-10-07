"use client";

import React, { useState } from "react";
import { VOCABULARY_LIST, VocabularyWord } from "@/data/vocabulary";
import { Flashcard3D } from "@/components/learning/Flashcard3D";
import { PinyinQuiz } from "@/components/learning/PinyinQuiz";
import { TianzigeGrid } from "@/components/learning/TianzigeGrid";
import { PillButton } from "@/components/ui/PillButton";
import { ChevronLeft, ChevronRight, Shuffle, Sparkles, BookOpen } from "lucide-react";
import confetti from "canvas-confetti";

export default function VocabularyPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState<string>("ALL");
  const [masteredCount, setMasteredCount] = useState(12);

  const filteredList =
    selectedLevel === "ALL"
      ? VOCABULARY_LIST
      : VOCABULARY_LIST.filter((w) => w.level === selectedLevel);

  const currentWord = filteredList[currentIndex] || VOCABULARY_LIST[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredList.length) % filteredList.length);
  };

  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * filteredList.length);
    setCurrentIndex(randomIndex);
  };

  const handleMastered = () => {
    setMasteredCount((prev) => prev + 1);
    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 },
        colors: ["#10b981", "#0ea5e9", "#f59e0b"],
      });
    } catch (e) {}
    handleNext();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-hanzi font-bold flex items-center justify-center text-sm">
              词
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-content-main">
              Sổ Tay Từ Vựng 3D (生词本)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-content-muted mt-1">
            Lật thẻ flashcard 3D mô phỏng chiều sâu không gian, nghe phát âm và luyện viết trong ô chữ Mễ.
          </p>
        </div>

        {/* Level filter tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full text-xs font-bold">
          {["ALL", "HSK1", "HSK2", "HSK3"].map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setSelectedLevel(lvl);
                setCurrentIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                selectedLevel === lvl
                  ? "bg-white dark:bg-slate-900 text-primary shadow-sm"
                  : "text-content-muted hover:text-content-main"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Main Flashcard Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 3D Flashcard & Navigation (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center w-full space-y-6">
          <Flashcard3D word={currentWord} onMastered={handleMastered} className="w-full" />

          {/* Controls Bar */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full glass-card border border-white/60 dark:border-white/10 flex items-center justify-center text-content-main hover:scale-105 active:scale-95 transition-all shadow-md"
              aria-label="Từ trước"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-content-muted px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
              {currentIndex + 1} / {filteredList.length} từ
            </span>

            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full glass-card border border-white/60 dark:border-white/10 flex items-center justify-center text-content-main hover:scale-105 active:scale-95 transition-all shadow-md"
              aria-label="Từ kế tiếp"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={handleShuffle}
              className="p-2.5 rounded-full glass-card border border-white/60 dark:border-white/10 text-content-muted hover:text-primary hover:scale-105 transition-all shadow-md"
              title="Xáo trộn ngẫu nhiên"
            >
              <Shuffle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Practice Studio (Tianzige & Pinyin Quiz) (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Tianzige Writing Panel */}
          <div className="glass-card p-6 rounded-3xl border border-white/70 dark:border-white/10 shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>Luyện Viết Chữ Này</span>
              </span>
              <span className="text-xs text-content-muted">
                {currentWord.radical} ({currentWord.radicalMeaning})
              </span>
            </div>

            <TianzigeGrid
              hanzi={currentWord.hanzi[0] || "好"}
              pinyin={currentWord.pinyin}
              interactive={true}
              size="lg"
            />
          </div>

          {/* Quick Pinyin Quiz */}
          <PinyinQuiz
            hanzi={currentWord.hanzi}
            options={[
              currentWord.pinyin,
              "bù kèqi",
              "zàijiàn",
              "lǎoshī hǎo",
            ].sort(() => 0.5 - Math.random())}
            correctIndex={0}
            explanation={`Từ ${currentWord.hanzi} có phiên âm chuẩn là "${currentWord.pinyin}".`}
          />
        </div>
      </div>
    </div>
  );
}
