"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Bookmark, BookmarkCheck, Volume2 } from "lucide-react";

export interface SubtitleLine {
  id: string;
  time: number; // in seconds
  hanzi: string;
  pinyin: string;
  vietnamese: string;
  keyWords?: {
    word: string;
    meaning: string;
  }[];
}

interface DualSubtitleProps {
  subtitles: SubtitleLine[];
  currentTime: number;
  onSeek?: (time: number) => void;
  className?: string;
}

export function DualSubtitle({
  subtitles,
  currentTime,
  onSeek,
  className,
}: DualSubtitleProps) {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSpeak = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "zh-CN";
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div
      className={cn(
        "glass-card p-4 sm:p-5 rounded-3xl space-y-3 overflow-y-auto max-h-[460px] scrollbar-thin",
        className
      )}
    >
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <h4 className="font-bold text-sm text-content-main flex items-center gap-2">
          <span>💬 Phụ Đề Song Ngữ Trung - Việt</span>
        </h4>
        <span className="text-xs text-content-muted">
          Click câu để tua video
        </span>
      </div>

      <div className="space-y-2.5">
        {subtitles.map((line) => {
          const isActive =
            currentTime >= line.time &&
            currentTime < line.time + 4; // active window
          const isBookmarked = bookmarkedIds.includes(line.id);

          return (
            <div
              key={line.id}
              onClick={() => onSeek?.(line.time)}
              className={cn(
                "p-3.5 rounded-2xl transition-all cursor-pointer border",
                isActive
                  ? "bg-primary/10 border-primary shadow-sm scale-[1.01]"
                  : "bg-white/60 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  {/* Hanzi */}
                  <div className="flex items-center gap-2">
                    <p
                      className={cn(
                        "text-base sm:text-lg font-hanzi font-bold",
                        isActive ? "text-primary" : "text-content-main"
                      )}
                    >
                      {line.hanzi}
                    </p>
                    <button
                      onClick={(e) => handleSpeak(line.hanzi, e)}
                      className="p-1 rounded-full text-content-muted hover:text-primary transition-colors"
                      title="Nghe câu này"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Pinyin */}
                  <p className="text-xs text-primary/80 font-medium">
                    {line.pinyin}
                  </p>

                  {/* Vietnamese */}
                  <p className="text-xs sm:text-sm text-content-muted">
                    {line.vietnamese}
                  </p>
                </div>

                {/* Bookmark action */}
                <button
                  onClick={(e) => toggleBookmark(line.id, e)}
                  className="p-1.5 rounded-full text-content-muted hover:text-amber-500 transition-colors shrink-0"
                  title="Lưu câu vào sổ tay"
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Key vocabulary tags if available */}
              {line.keyWords && line.keyWords.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  <span className="text-[10px] font-bold text-content-muted uppercase">
                    Từ vựng:
                  </span>
                  {line.keyWords.map((kw, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 font-medium"
                    >
                      {kw.word}: {kw.meaning}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
