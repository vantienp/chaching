"use client";

import React, { useState } from "react";
import { EXERCISES_DATA, ExerciseQuestion } from "@/data/exercises";
import { RuledPaperCard } from "@/components/stationery/RuledPaperCard";
import { StickyNote } from "@/components/stationery/StickyNote";
import { StampSeal } from "@/components/stationery/StampSeal";
import { AudioWavePlayer } from "@/components/learning/AudioWavePlayer";
import { TianzigeGrid } from "@/components/learning/TianzigeGrid";
import { PillButton } from "@/components/ui/PillButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CheckCircle2, Send, RotateCcw, Sparkles, BookOpen } from "lucide-react";
import confetti from "canvas-confetti";

export default function ExercisesPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSeal, setShowSeal] = useState(false);

  const totalQuestions = EXERCISES_DATA.length;
  const currentQuestion = EXERCISES_DATA[currentStep];

  const handleSelectAnswer = (qId: string, ans: any) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: ans }));
  };

  const handleNextStep = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmitAll = () => {
    setIsSubmitted(true);
    setShowSeal(true);
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#ef4444", "#f59e0b", "#0ea5e9", "#10b981", "#ec4899"],
      });
    } catch (e) {}
  };

  const handleReset = () => {
    setAnswers({});
    setIsSubmitted(false);
    setShowSeal(false);
    setCurrentStep(0);
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-rose-500/15 text-rose-600 font-hanzi font-bold flex items-center justify-center text-sm">
              练
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-content-main">
              Phòng Bài Tập Tổng Hợp (Split-Pane Studio)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-content-muted mt-1">
            Giao diện chia đôi màn hình: Vừa theo dõi đề bài & audio bên trái, vừa làm bài tập trên trang vở kẻ ngang bên phải.
          </p>
        </div>

        {/* Progress status */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-content-muted">
            Đã làm: {answeredCount}/{totalQuestions} câu
          </span>
          <div className="w-32">
            <ProgressBar value={answeredCount} max={totalQuestions} />
          </div>
        </div>
      </div>

      {/* ==================== SPLIT-PANE LAYOUT ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
        {/* ==================== LEFT PANE: CONTEXT (5 cols) ==================== */}
        <div className="lg:col-span-5 space-y-5">
          <div className="glass-card p-6 rounded-3xl border border-white/75 dark:border-white/10 shadow-lg space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>Dữ Liệu Đề Bài & Ngữ Cảnh</span>
            </span>

            <div className="p-4 bg-sky-50/70 dark:bg-slate-800/60 rounded-2xl border border-sky-100 dark:border-slate-700/60 space-y-2">
              <span className="text-xs font-bold text-content-muted uppercase">
                Câu Hỏi {currentStep + 1} / {totalQuestions}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-hanzi text-content-main leading-snug">
                {currentQuestion.hanziPrompt}
              </h3>
              <p className="text-xs sm:text-sm text-primary font-medium">
                {currentQuestion.pinyinPrompt}
              </p>
            </div>

            {/* Audio prompt player */}
            <div className="pt-2">
              <AudioWavePlayer
                title="Nghe gợi ý phát âm"
                subtitle="Cố vấn học tập Mimi AI"
                textToSpeak={currentQuestion.hanziPrompt}
                maxListens={5}
              />
            </div>
          </div>

          {/* Sticky Note Hint */}
          <StickyNote
            color="yellow"
            tilt="left"
            title="Gợi ý của giáo viên (Tips)"
          >
            <p>{currentQuestion.hint}</p>
          </StickyNote>
        </div>

        {/* ==================== RIGHT PANE: ACTION RULED PAPER (7 cols) ==================== */}
        <div className="lg:col-span-7 space-y-5 relative">
          {/* Stamp Seal drop overlay upon submission */}
          {showSeal && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/85 backdrop-blur-md rounded-3xl p-6 text-center animate-in zoom-in-75 duration-300">
              <StampSeal variant="score100" />
              <h3 className="text-2xl font-extrabold text-content-main mt-4">
                Hoàn Thành Xuất Sắc! 太棒了!
              </h3>
              <p className="text-sm text-content-muted max-w-sm mt-1">
                Bạn đã hoàn thành trọn vẹn bài tập hôm nay. Điểm số: <strong>100/100</strong>. Chuỗi Streak được cộng thêm +1 ngày!
              </p>
              <div className="flex gap-3 mt-5">
                <PillButton
                  variant="primary"
                  size="sm"
                  onClick={() => setShowSeal(false)}
                >
                  Xem Lại Lời Giải
                </PillButton>
                <PillButton variant="secondary" size="sm" onClick={handleReset}>
                  Làm Lại Bài Này
                </PillButton>
              </div>
            </div>
          )}

          {/* Ruled Notebook Paper Card */}
          <RuledPaperCard withClip={true} withBinderHoles={true}>
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-700">
                <span className="font-bold text-sm text-content-main">
                  {currentQuestion.title}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-content-muted">
                  Dạng: {currentQuestion.type}
                </span>
              </div>

              {/* Render Question Input according to Type */}
              {currentQuestion.type === "multiple_choice" && (
                <div className="space-y-2.5">
                  {currentQuestion.options?.map((opt, idx) => {
                    const isSelected = answers[currentQuestion.id] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() =>
                          handleSelectAnswer(currentQuestion.id, idx)
                        }
                        disabled={isSubmitted}
                        className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-primary text-white border-primary shadow-md"
                            : "bg-white/80 dark:bg-slate-800/80 hover:bg-white border-slate-200 dark:border-slate-700 text-content-main"
                        }`}
                      >
                        <span>
                          {String.fromCharCode(65 + idx)}. {opt}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-white shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {currentQuestion.type === "fill_blank" && (
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-content-muted">
                    Chọn từ phù hợp nhất điền vào khoảng trống:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {currentQuestion.options?.map((opt) => {
                      const isSelected = answers[currentQuestion.id] === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() =>
                            handleSelectAnswer(currentQuestion.id, opt)
                          }
                          disabled={isSubmitted}
                          className={`px-5 py-2.5 rounded-full font-hanzi text-lg font-bold border transition-all cursor-pointer shadow-xs ${
                            isSelected
                              ? "bg-primary text-white border-primary shadow-md"
                              : "bg-white dark:bg-slate-800 hover:border-primary text-content-main"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentQuestion.type === "tianzige_write" && (
                <div className="space-y-4 flex flex-col items-center">
                  <p className="text-xs sm:text-sm text-content-muted text-center">
                    Dùng chuột hoặc ngón tay tập viết chữ &ldquo;{currentQuestion.hanziPrompt}&rdquo; trong ô chữ Mễ bên dưới:
                  </p>
                  <TianzigeGrid
                    hanzi={currentQuestion.hanziPrompt}
                    interactive={true}
                    size="lg"
                  />
                  <PillButton
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      handleSelectAnswer(currentQuestion.id, "written")
                    }
                  >
                    Đánh dấu đã viết xong ✔
                  </PillButton>
                </div>
              )}

              {/* Step Navigation Controls */}
              <div className="pt-6 border-t border-slate-200/60 dark:border-slate-700 flex items-center justify-between">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-content-muted hover:text-content-main disabled:opacity-40"
                >
                  ← Câu Trước
                </button>

                <div className="flex items-center gap-2">
                  {currentStep < totalQuestions - 1 ? (
                    <PillButton
                      variant="secondary"
                      size="sm"
                      onClick={handleNextStep}
                    >
                      Câu Kế Tiếp →
                    </PillButton>
                  ) : (
                    <PillButton
                      variant="accent"
                      size="md"
                      icon={<Send className="w-4 h-4 text-slate-950" />}
                      onClick={handleSubmitAll}
                      disabled={isSubmitted}
                      className="font-black text-slate-950 shadow-lg"
                    >
                      Nộp Toàn Bộ Bài Tập
                    </PillButton>
                  )}
                </div>
              </div>
            </div>
          </RuledPaperCard>
        </div>
      </div>
    </div>
  );
}
