"use client";

import React, { useState } from "react";
import { STUDENTS_LIST } from "@/data/students";
import { PillButton } from "@/components/ui/PillButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { CalendarCheck, Check, X, Clock, Save, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

type AttendanceState = "present" | "absent" | "late";

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<Record<string, AttendanceState>>(
    () => {
      const initial: Record<string, AttendanceState> = {};
      STUDENTS_LIST.forEach((s) => {
        initial[s.id] = s.attendance;
      });
      return initial;
    }
  );

  const [saved, setSaved] = useState(false);

  const toggleStatus = (id: string) => {
    setAttendance((prev) => {
      const current = prev[id] || "present";
      let next: AttendanceState = "present";
      if (current === "present") next = "late";
      else if (current === "late") next = "absent";
      else next = "present";
      return { ...prev, [id]: next };
    });
    setSaved(false);
  };

  const setAllPresent = () => {
    const updated: Record<string, AttendanceState> = {};
    STUDENTS_LIST.forEach((s) => {
      updated[s.id] = "present";
    });
    setAttendance(updated);
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#10b981", "#0ea5e9", "#f59e0b"],
      });
    } catch (e) {}
  };

  const presentCount = Object.values(attendance).filter((s) => s === "present").length;
  const lateCount = Object.values(attendance).filter((s) => s === "late").length;
  const absentCount = Object.values(attendance).filter((s) => s === "absent").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-600 font-hanzi font-bold flex items-center justify-center text-sm">
              到
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-content-main">
              Điểm Danh 1-Chạm (快速考勤)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-content-muted mt-1">
            Bấm trực tiếp vào trạng thái để xoay vòng: <strong>Có mặt ➔ Đi muộn ➔ Vắng mặt</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <PillButton
            variant="secondary"
            size="sm"
            onClick={setAllPresent}
          >
            Điểm Danh Tất Cả Có Mặt
          </PillButton>

          <PillButton
            variant="accent"
            size="sm"
            icon={<Save className="w-4 h-4 text-slate-950" />}
            onClick={handleSave}
            className="text-slate-950 font-black"
          >
            {saved ? "Đã Lưu Điểm Danh ✔" : "Lưu Kết Quả Điểm Danh"}
          </PillButton>
        </div>
      </div>

      {/* Summary Counter Pills */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-4 rounded-2xl border border-emerald-500/20 text-center space-y-1 bg-emerald-50/50 dark:bg-emerald-950/20">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
            Có Mặt
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {presentCount}
          </p>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-amber-500/20 text-center space-y-1 bg-amber-50/50 dark:bg-amber-950/20">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase">
            Đi Muộn
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
            {lateCount}
          </p>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-rose-500/20 text-center space-y-1 bg-rose-50/50 dark:bg-rose-950/20">
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase">
            Vắng Mặt
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400">
            {absentCount}
          </p>
        </div>
      </div>

      {/* Attendance Roster Table */}
      <div className="glass-card rounded-3xl border border-white/80 dark:border-white/10 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-800/70 border-b border-slate-200/60 dark:border-slate-800 text-content-muted font-bold">
                <th className="py-4 px-6">STT</th>
                <th className="py-4 px-6">Học Viên</th>
                <th className="py-4 px-4">Lớp Học</th>
                <th className="py-4 px-4">Số Điện Thoại</th>
                <th className="py-4 px-6 text-center">Trạng Thái (Click để đổi)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {STUDENTS_LIST.map((stu, idx) => {
                const status = attendance[stu.id] || "present";

                const config = {
                  present: {
                    label: "Có Mặt ✔",
                    className:
                      "bg-emerald-500 text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)]",
                  },
                  late: {
                    label: "Đi Muộn ⏱",
                    className:
                      "bg-amber-500 text-slate-950 shadow-[0_4px_12px_rgba(245,158,11,0.3)]",
                  },
                  absent: {
                    label: "Vắng Mặt ✖",
                    className:
                      "bg-rose-500 text-white shadow-[0_4px_12px_rgba(244,63,94,0.3)]",
                  },
                };

                return (
                  <tr
                    key={stu.id}
                    className="hover:bg-white/60 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-4 px-6 font-mono text-content-muted">
                      {idx + 1}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs shrink-0">
                          {stu.name.split(" ").slice(-1)[0]}
                        </div>
                        <div>
                          <p className="font-bold text-content-main">
                            {stu.name}{" "}
                            <span className="font-hanzi text-primary text-xs font-semibold">
                              ({stu.chineseName})
                            </span>
                          </p>
                          <span className="text-[11px] text-content-muted">
                            Streak: {stu.streak} ngày
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-content-muted text-xs">
                      {stu.class}
                    </td>

                    <td className="py-4 px-4 font-mono text-xs text-content-muted">
                      {stu.phone}
                    </td>

                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => toggleStatus(stu.id)}
                        className={`px-5 py-2 rounded-full font-bold text-xs transition-all duration-200 active:scale-95 cursor-pointer ${config[status].className}`}
                        title="Click để đổi trạng thái điểm danh"
                      >
                        {config[status].label}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
