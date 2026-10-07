"use client";

import React, { useState } from "react";
import { AudioWavePlayer } from "@/components/learning/AudioWavePlayer";
import { PinyinQuiz } from "@/components/learning/PinyinQuiz";
import { MultipleChoice } from "@/components/learning/MultipleChoice";
import { StickyNote } from "@/components/stationery/StickyNote";
import { Headphones, CheckCircle2, Sparkles, Volume2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function ListeningPage() {
  const [completedQuizzes, setCompletedQuizzes] = useState<number>(0);

  const handleQuizSuccess = () => {
    setCompletedQuizzes((prev) => prev + 1);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#0ea5e9", "#10b981", "#f59e0b"],
      });
    } catch (e) {}
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-600 font-hanzi font-bold flex items-center justify-center text-sm">
            听
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-content-main">
            Phòng Luyện Nghe Tiếng Trung (汉语听力)
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-content-muted mt-1">
          Rèn luyện khả năng phân biệt thanh điệu và ngữ điệu đàm thoại chuẩn giọng phát thanh viên Bắc Kinh.
        </p>
      </div>

      {/* Main Dialogue Player */}
      <div className="space-y-4">
        <AudioWavePlayer
          title="Đàm thoại: Bạn muốn uống trà hay cà phê? (你想喝茶还是咖啡？)"
          subtitle="Giọng phát thanh CCTV • Tốc độ tiêu chuẩn HSK 1 - 2"
          textToSpeak="你想喝茶还是咖啡？我想喝一杯乌龙茶，谢谢。"
          maxListens={3}
          onFinished={() => {}}
        />
      </div>

      {/* Grid: Comprehension Questions & Pronunciation Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Questions (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <MultipleChoice
            question="1. Qua đoạn đàm thoại vừa nghe, người B muốn uống loại thức uống nào?"
            options={[
              "Một cốc cà phê đen (一杯黑咖啡)",
              "Một cốc trà Ô Long (一杯乌龙茶)",
              "Một cốc trà sữa trân châu (一杯珍珠奶茶)",
              "Một chai nước khoáng (一瓶矿泉水)",
            ]}
            correctIndex={1}
            explanation="Người B nói: '我想喝一杯乌龙茶' (Tôi muốn uống một cốc trà Ô Long)."
            onAnswer={(correct) => correct && handleQuizSuccess()}
          />

          <PinyinQuiz
            hanzi="咖啡"
            options={["kāfēi", "kǎfěi", "kàfèi", "kāfěi"]}
            correctIndex={0}
            explanation="Từ '咖啡' (cà phê) cả hai âm tiết đều mang thanh 1: kā fēi."
            onCorrect={handleQuizSuccess}
          />
        </div>

        {/* Right Column: Stationery Tips (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <StickyNote
            color="yellow"
            tilt="right"
            title="Mẹo Phân Biệt Thanh 1 và Thanh 4"
          >
            <p className="mb-2">
              • <strong>Thanh 1 (Ngang - 55):</strong> Giọng cao, đều và kéo dài (như tiếng còi tàu: <em>mā</em>).
            </p>
            <p>
              • <strong>Thanh 4 (Rơi dứt khoát - 51):</strong> Hạ giọng dứt khoát từ cao xuống thấp (như ra lệnh dứt khoát: <em>mà</em>).
            </p>
          </StickyNote>

          <StickyNote
            color="green"
            tilt="left"
            title="Quy Tắc Biến Điệu Của '一' (Yī)"
          >
            <p>
              Khi &lsquo;一&rsquo; đứng trước từ mang <strong>thanh 4</strong> (như 杯 bēi - thanh 1, nhưng đứng trước từ mang thanh 4), &lsquo;一&rsquo; sẽ đổi sang đọc thành thanh 2 (<em>yí</em>). Đứng trước thanh 1, 2, 3 thì đọc thành thanh 4 (<em>yì bēi chá</em>).
            </p>
          </StickyNote>
        </div>
      </div>
    </div>
  );
}
