"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Sparkles } from "lucide-react";

interface VideoPlayerProps {
  title: string;
  level: string;
  currentTime: number;
  onTimeUpdate: (time: number) => void;
  className?: string;
}

export function VideoPlayer({
  title,
  level,
  currentTime,
  onTimeUpdate,
  className,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const totalDuration = 120; // 2 minutes mock

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        onTimeUpdate((currentTime + 1) % totalDuration);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, totalDuration, onTimeUpdate]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={cn(
        "relative rounded-3xl overflow-hidden shadow-2xl bg-slate-950 aspect-video flex flex-col justify-between group select-none border border-white/20",
        className
      )}
    >
      {/* Simulated Video Canvas / Visual scene */}
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-900 via-indigo-950 to-slate-900 flex flex-col items-center justify-center p-6 text-center">
        {/* Animated backdrop glow */}
        <div className="absolute w-72 h-72 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

        {/* Video simulation artwork */}
        <div className="relative z-10 space-y-3">
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-primary border border-white/20">
            {level} • Video Đàm Thoại Thực Tế
          </span>
          <h3 className="text-xl sm:text-3xl font-bold font-hanzi text-white tracking-wide drop-shadow-md">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Học giao tiếp tiếng Trung qua hoạt cảnh đời sống tại Bắc Kinh & Thượng Hải.
          </p>
        </div>

        {/* Big Center Play Icon when paused */}
        {!isPlaying && (
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute z-20 w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
            aria-label="Bắt đầu xem video"
          >
            <Play className="w-8 h-8 fill-current ml-1" />
          </button>
        )}
      </div>

      {/* Top Title Overlay */}
      <div className="relative z-20 p-4 bg-gradient-to-b from-black/70 to-transparent flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold truncate">
            {title}
          </span>
        </div>
        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-md font-medium">
          1080p 60fps
        </span>
      </div>

      {/* Bottom Controls Bar */}
      <div className="relative z-20 p-4 bg-gradient-to-t from-black/85 via-black/50 to-transparent space-y-2">
        {/* Progress scrub bar */}
        <div className="w-full h-1.5 bg-white/25 rounded-full overflow-hidden cursor-pointer">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${(currentTime / totalDuration) * 100}%` }}
          />
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between text-white text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              aria-label={isPlaying ? "Tạm dừng" : "Tiếp tục"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current" />
              )}
            </button>

            <button
              onClick={() => onTimeUpdate(0)}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              title="Xem lại từ đầu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              title={isMuted ? "Bật âm" : "Tắt âm"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            <span className="text-slate-300 font-mono text-xs">
              {formatTime(currentTime)} / {formatTime(totalDuration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-primary font-bold hidden sm:inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Dual-Sub Sync
            </span>
            <button
              onClick={() => {
                if (document.fullscreenElement) {
                  document.exitFullscreen();
                } else {
                  const elem = document.querySelector(".aspect-video");
                  elem?.requestFullscreen?.();
                }
              }}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              title="Toàn màn hình"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
