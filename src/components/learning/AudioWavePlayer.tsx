"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react";

interface AudioWavePlayerProps {
  textToSpeak?: string;
  title?: string;
  subtitle?: string;
  maxListens?: number;
  className?: string;
  onFinished?: () => void;
}

export function AudioWavePlayer({
  textToSpeak = "你好，请问洗手间在哪里？",
  title = "Đàm thoại chuẩn Bắc Kinh",
  subtitle = "Giọng đọc phát thanh viên CCTV",
  maxListens = 3,
  className,
  onFinished,
}: AudioWavePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<0.75 | 1.0 | 1.25>(1.0);
  const [listensCount, setListensCount] = useState(0);

  const togglePlay = () => {
    if (isPlaying) {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      return;
    }

    if (listensCount >= maxListens) {
      alert("Bạn đã hết lượt nghe cho bài thi thử này!");
      return;
    }

    setIsPlaying(true);
    setListensCount((prev) => prev + 1);

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "zh-CN";
      utterance.rate = speed;
      utterance.onend = () => {
        setIsPlaying(false);
        onFinished?.();
      };
      utterance.onerror = () => {
        setIsPlaying(false);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        setIsPlaying(false);
        onFinished?.();
      }, 3000 / speed);
    }
  };

  const handleReset = () => {
    setListensCount(0);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  return (
    <div
      className={cn(
        "glass-card p-5 sm:p-6 rounded-3xl border border-white/70 dark:border-white/10 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-5",
        className
      )}
    >
      {/* Left: Play button + Wave bars */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <button
          onClick={togglePlay}
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-lg",
            isPlaying
              ? "bg-accent text-slate-950 scale-105"
              : "bg-primary text-white hover:bg-primary-hover hover:scale-105"
          )}
          aria-label={isPlaying ? "Dừng audio" : "Phát audio"}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 fill-current" />
          ) : (
            <Play className="w-6 h-6 fill-current ml-0.5" />
          )}
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-sm sm:text-base text-content-main leading-tight">
              {title}
            </h4>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold uppercase">
              HD 48kHz
            </span>
          </div>
          <p className="text-xs text-content-muted">{subtitle}</p>

          {/* 5 Audio Wave Bars */}
          <div className="flex items-end gap-1 h-6 pt-1">
            {[40, 75, 100, 60, 85].map((height, i) => (
              <span
                key={i}
                className={cn(
                  "w-1 rounded-full bg-primary transition-all duration-300",
                  isPlaying ? "animate-pulse" : "opacity-40"
                )}
                style={{
                  height: isPlaying ? `${height}%` : "30%",
                  animationDelay: `${i * 120}ms`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right: Controls & Speed pills */}
      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
        {/* Speed options */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-full text-xs font-semibold">
          {([0.75, 1.0, 1.25] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={cn(
                "px-3 py-1 rounded-full transition-all",
                speed === s
                  ? "bg-white dark:bg-slate-700 text-primary shadow-sm font-bold"
                  : "text-content-muted hover:text-content-main"
              )}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Counter & Repeat */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-content-muted">
            {listensCount}/{maxListens} lần
          </span>
          <button
            onClick={handleReset}
            title="Làm mới số lượt nghe"
            className="p-2 rounded-full text-content-muted hover:text-content-main hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
