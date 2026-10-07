"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Calendar, Clock, Video, User } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";

interface UpcomingClassProps {
  className?: string;
}

export function UpcomingClass({ className }: UpcomingClassProps) {
  return (
    <div
      className={cn(
        "glass-card p-6 rounded-3xl border border-white/75 dark:border-white/10 shadow-lg space-y-4 relative overflow-hidden",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>Lớp Học Trực Tuyến Sắp Tới</span>
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold animate-pulse">
          Sắp diễn ra
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg sm:text-xl font-bold text-content-main leading-tight">
          Lớp HSK 2 — Buổi Tối Tiêu Chuẩn (Bài 3)
        </h3>
        <p className="text-xs sm:text-sm text-content-muted">
          Chủ đề: Giao tiếp gọi món tại nhà hàng Bắc Kinh & Luyện câu chữ 把
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs font-medium">
          <Clock className="w-4 h-4 text-primary shrink-0" />
          <span>18:30 - 20:30 (Hôm nay)</span>
        </div>
        <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs font-medium">
          <User className="w-4 h-4 text-accent shrink-0" />
          <span>Cô Vương Linh (王玲)</span>
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between">
        <span className="text-xs text-content-muted">
          Phòng học: <strong className="text-content-main">Room 102</strong>
        </span>
        <PillButton
          variant="primary"
          size="sm"
          icon={<Video className="w-4 h-4" />}
          onClick={() => alert("Đang kết nối vào phòng học trực tuyến...")}
        >
          Vào Lớp Học
        </PillButton>
      </div>
    </div>
  );
}
