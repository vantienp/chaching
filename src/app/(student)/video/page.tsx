"use client";

import React, { useState } from "react";
import { VideoPlayer } from "@/components/learning/VideoPlayer";
import { DualSubtitle, SubtitleLine } from "@/components/learning/DualSubtitle";
import { StickyNote } from "@/components/stationery/StickyNote";
import { Video, BookMarked, Sparkles } from "lucide-react";

export default function VideoPage() {
  const [currentTime, setCurrentTime] = useState<number>(0);

  const mockSubtitles: SubtitleLine[] = [
    {
      id: "sub-1",
      time: 0,
      hanzi: "服务员，请问这里有菜单吗？",
      pinyin: "Fúwùyuán, qǐngwèn zhèlǐ yǒu càidān ma?",
      vietnamese: "Phục vụ ơi, cho hỏi ở đây có thực đơn không?",
      keyWords: [
        { word: "服务员", meaning: "Phục vụ" },
        { word: "菜单", meaning: "Thực đơn" },
      ],
    },
    {
      id: "sub-2",
      time: 15,
      hanzi: "有的，这是我们的今日特色菜单。",
      pinyin: "Yǒu de, zhè shì wǒmen de jīnrì tèsè càidān.",
      vietnamese: "Dạ có ạ, đây là thực đơn món đặc biệt hôm nay của chúng tôi.",
      keyWords: [{ word: "特色", meaning: "Đặc sắc / đặc sản" }],
    },
    {
      id: "sub-3",
      time: 32,
      hanzi: "请问你们想吃点儿什么？",
      pinyin: "Qǐngwèn nǐmen xiǎng chī diǎnr shénme?",
      vietnamese: "Xin hỏi anh chị muốn dùng món gì ạ?",
      keyWords: [{ word: "吃点儿", meaning: "Ăn một chút" }],
    },
    {
      id: "sub-4",
      time: 50,
      hanzi: "我们要一份北京烤鸭和两碗米饭。",
      pinyin: "Wǒmen yào yí fèn Běijīng kǎoyā hé liǎng wǎn mǐfàn.",
      vietnamese: "Chúng tôi lấy một phần vịt quay Bắc Kinh và hai bát cơm trắng.",
      keyWords: [
        { word: "北京烤鸭", meaning: "Vịt quay Bắc Kinh" },
        { word: "米饭", meaning: "Cơm trắng" },
      ],
    },
    {
      id: "sub-5",
      time: 75,
      hanzi: "好的，请稍等，菜马上就来！",
      pinyin: "Hǎo de, qǐng shāoděng, cài mǎshàng jiù lái!",
      vietnamese: "Dạ vâng, xin đợi một lát, món ăn sẽ lên ngay ạ!",
      keyWords: [{ word: "马上", meaning: "Ngay lập tức" }],
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-amber-500/15 text-amber-600 font-hanzi font-bold flex items-center justify-center text-sm">
            视
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-content-main">
            Xem Video Song Ngữ (视听课堂)
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-content-muted mt-1">
          Học tiếng Trung giao tiếp thực tế với hệ thống phụ đề đối chiếu song ngữ Trung - Việt đồng bộ theo thời gian thực.
        </p>
      </div>

      {/* Main Video & Subtitle Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Video Player (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <VideoPlayer
            title="Tập 3: Đi ăn tại nhà hàng vịt quay Bắc Kinh (在全聚德吃烤鸭)"
            level="HSK 2"
            currentTime={currentTime}
            onTimeUpdate={(t) => setCurrentTime(t)}
          />

          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs text-content-muted space-y-1">
            <span className="font-bold text-content-main block">
              💡 Mẹo học với Video Song Ngữ:
            </span>
            <p>
              • Bấm trực tiếp vào bất kỳ dòng phụ đề nào ở bên phải để tua video đến đúng câu thoại đó.
            </p>
            <p>
              • Bấm biểu tượng loa để nghe phát âm riêng từng câu không giới hạn số lần.
            </p>
          </div>
        </div>

        {/* Right Column: Dual Subtitles (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <DualSubtitle
            subtitles={mockSubtitles}
            currentTime={currentTime}
            onSeek={(time) => setCurrentTime(time)}
          />

          <StickyNote
            color="pink"
            tilt="left"
            title="Văn hóa ẩm thực: '买单' vs '结账'"
          >
            <p>
              Khi muốn gọi thanh toán hóa đơn ở miền Nam Trung Quốc (Quảng Châu, Thâm Quyến), người ta thường nói <strong>买单 (mǎidān)</strong>, trong khi ở miền Bắc (Bắc Kinh) hay dùng <strong>结账 (jiézhàng)</strong> hơn.
            </p>
          </StickyNote>
        </div>
      </div>
    </div>
  );
}
