"use client";

import React from "react";
import Link from "next/link";
import { StatCard } from "@/components/dashboard/StatCard";
import { StreakCounter } from "@/components/dashboard/StreakCounter";
import { ProgressChart } from "@/components/dashboard/ProgressChart";
import { UpcomingClass } from "@/components/dashboard/UpcomingClass";
import { GlassCard } from "@/components/ui/GlassCard";
import { PillButton } from "@/components/ui/PillButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { LESSONS_LIST } from "@/data/lessons";
import { BookOpen, Award, CheckCircle2, ArrowRight, Sparkles, Clock } from "lucide-react";
import { PaperClip } from "@/components/stationery/PaperClip";

export default function StudentDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative glass-card p-6 sm:p-8 rounded-[32px] border border-white/80 dark:border-white/10 shadow-xl overflow-hidden bg-gradient-to-r from-sky-500/10 via-primary/10 to-amber-500/10">
        <PaperClip color="gold" position="top-right" />
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold">
              HSK 2 Standard
            </span>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chăm chỉ điểm danh mỗi ngày!</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-content-main tracking-tight">
            Chào buổi tối, Minh Anh! 阮明英
          </h1>
          <p className="text-xs sm:text-sm text-content-muted leading-relaxed">
            Hôm nay bạn có <strong>1 lớp học trực tuyến lúc 18:30</strong> và <strong>1 bài tập cần nộp</strong>. Cố gắng giữ vững chuỗi Streak 15 ngày nhé!
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link href="/exercises">
              <PillButton variant="primary" size="sm">
                Làm Bài Tập Hôm Nay
              </PillButton>
            </Link>
            <Link href="/vocabulary">
              <PillButton variant="secondary" size="sm">
                Ôn Tập Từ Vựng
              </PillButton>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Từ vựng đã thuộc"
          value="155"
          subValue="/ 300 từ"
          icon={<BookOpen className="w-5 h-5" />}
          trend="+12 từ tuần này"
          color="sky"
        />
        <StatCard
          title="Bài học hoàn thành"
          value="18"
          subValue="bài"
          icon={<CheckCircle2 className="w-5 h-5" />}
          trend="Đạt 75% kế hoạch"
          color="emerald"
        />
        <StatCard
          title="Điểm kiểm tra TB"
          value="96"
          subValue="/ 100"
          icon={<Award className="w-5 h-5" />}
          trend="Top 3 cả lớp"
          color="amber"
        />
        <StatCard
          title="Giờ luyện nghe"
          value="14.5"
          subValue="giờ"
          icon={<Clock className="w-5 h-5" />}
          trend="+2.5h tuần này"
          color="purple"
        />
      </div>

      {/* Grid Row: Streak Counter & Upcoming Class */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StreakCounter initialStreak={15} />
        <UpcomingClass />
      </div>

      {/* Grid Row: Progress Chart & Ongoing Lessons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Chart */}
        <div className="lg:col-span-2">
          <ProgressChart />
        </div>

        {/* Current Lessons */}
        <div className="glass-card p-6 rounded-3xl border border-white/75 dark:border-white/10 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-content-main">
              Bài Học Hiện Tại
            </h3>
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Xem tất cả
            </Link>
          </div>

          <div className="space-y-3">
            {LESSONS_LIST.slice(0, 3).map((lesson) => (
              <div
                key={lesson.id}
                className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-primary block truncate">
                      {lesson.hanziTitle}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-content-main truncate">
                      {lesson.title}
                    </h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-content-muted font-bold shrink-0">
                    {lesson.duration}
                  </span>
                </div>

                <ProgressBar value={lesson.progress} />
              </div>
            ))}
          </div>

          <Link href="/exercises" className="block pt-2">
            <PillButton variant="primary" size="sm" className="w-full">
              Luyện Tập Ngay
            </PillButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
