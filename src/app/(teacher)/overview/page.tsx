"use client";

import React from "react";
import Link from "next/link";
import { StatCard } from "@/components/dashboard/StatCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { PillButton } from "@/components/ui/PillButton";
import { CLASSES_LIST } from "@/data/classes";
import { STUDENTS_LIST } from "@/data/students";
import { Users, GraduationCap, CalendarCheck, FileCheck, Clock, ArrowRight, Video } from "lucide-react";

export default function TeacherOverviewPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-content-main">
            Tổng Quan Trung Tâm (教师控制台)
          </h1>
          <p className="text-xs sm:text-sm text-content-muted mt-1">
            Chào mừng Cô Vương Linh quay trở lại! Bạn có 1 buổi dạy trực tuyến vào lúc 18:30 tối nay.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/attendance">
            <PillButton variant="accent" size="sm" icon={<CalendarCheck className="w-4 h-4 text-slate-950" />}>
              Điểm Danh Nhanh
            </PillButton>
          </Link>
          <Link href="/students">
            <PillButton variant="primary" size="sm">
              Xem Sổ Điểm
            </PillButton>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Tổng Học Viên"
          value="50"
          subValue="học viên"
          icon={<Users className="w-5 h-5" />}
          trend="+4 học viên mới tháng này"
          color="sky"
        />
        <StatCard
          title="Lớp Đang Hoạt Động"
          value="4"
          subValue="lớp"
          icon={<GraduationCap className="w-5 h-5" />}
          trend="Đủ sĩ số 95%"
          color="emerald"
        />
        <StatCard
          title="Tỷ Lệ Chuyên Cần"
          value="96.2%"
          subValue="tuần này"
          icon={<CalendarCheck className="w-5 h-5" />}
          trend="+1.5% so với tuần trước"
          color="amber"
        />
        <StatCard
          title="Bài Tập Chờ Chấm"
          value="6"
          subValue="bài"
          icon={<FileCheck className="w-5 h-5" />}
          trend="Cần duyệt hôm nay"
          color="rose"
        />
      </div>

      {/* Grid: Today's Schedule & Pending Homework */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Today's Schedule (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-white/75 dark:border-white/10 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-content-main flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Lịch Dạy Trực Tuyến Hôm Nay</span>
              </h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-mono">
                Thứ 4, 07/10/2026
              </span>
            </div>

            <div className="space-y-3">
              {CLASSES_LIST.map((cls) => (
                <div
                  key={cls.id}
                  className="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-primary/40 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                        {cls.status === "active" ? "Đang mở" : "Sắp khai giảng"}
                      </span>
                      <h4 className="font-bold text-sm text-content-main">
                        {cls.name}
                      </h4>
                    </div>
                    <p className="text-xs text-content-muted">
                      {cls.time} • {cls.room} • Sĩ số: {cls.studentCount}/{cls.maxStudents}
                    </p>
                  </div>

                  <PillButton
                    variant="primary"
                    size="sm"
                    icon={<Video className="w-3.5 h-3.5" />}
                    onClick={() => alert(`Mở phòng học trực tuyến cho ${cls.name}`)}
                  >
                    Vào Dạy
                  </PillButton>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pending Homework List (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-white/75 dark:border-white/10 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-content-main">
                Bài Tập Cần Duyệt Chấm Điểm
              </h3>
              <Link
                href="/students"
                className="text-xs font-semibold text-primary hover:underline"
              >
                Xem tất cả
              </Link>
            </div>

            <div className="space-y-3">
              {STUDENTS_LIST.filter((s) => s.homeworkStatus === "submitted").map(
                (stu) => (
                  <div
                    key={stu.id}
                    className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                        {stu.name.split(" ").slice(-1)[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-content-main">
                          {stu.name} ({stu.chineseName})
                        </h4>
                        <p className="text-[11px] text-content-muted">
                          Nộp bài tập đàm thoại • {stu.lastActive}
                        </p>
                      </div>
                    </div>

                    <PillButton
                      variant="secondary"
                      size="sm"
                      onClick={() => alert(`Mở bài tập của học viên ${stu.name} để chấm điểm`)}
                    >
                      Chấm điểm
                    </PillButton>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
