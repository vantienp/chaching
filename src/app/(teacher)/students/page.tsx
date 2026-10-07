"use client";

import React, { useState } from "react";
import { STUDENTS_LIST, Student } from "@/data/students";
import { GlassCard } from "@/components/ui/GlassCard";
import { PillButton } from "@/components/ui/PillButton";
import { Badge } from "@/components/ui/Badge";
import { Search, Flame, Award, Phone, Mail, Filter } from "lucide-react";

export default function StudentsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState<"score" | "streak" | "name">("score");

  const filteredStudents = STUDENTS_LIST.filter((stu) => {
    const matchesLevel =
      levelFilter === "ALL" || stu.level === levelFilter;
    const matchesSearch =
      stu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stu.chineseName.includes(searchTerm) ||
      stu.phone.includes(searchTerm);
    return matchesLevel && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "score") return b.score - a.score;
    if (sortBy === "streak") return b.streak - a.streak;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-600 font-hanzi font-bold flex items-center justify-center text-sm">
              生
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-content-main">
              Quản Lý Học Viên & Sổ Điểm (学员档案)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-content-muted mt-1">
            Theo dõi chi tiết kết quả học tập, chuỗi ngày streak và tình trạng nộp bài của từng học viên.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <PillButton
            variant="secondary"
            size="sm"
            onClick={() => alert("Đang xuất danh sách học viên ra file Excel...")}
          >
            Xuất File Excel
          </PillButton>
        </div>
      </div>

      {/* Search & Filters Row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-content-muted absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên, chữ Hán, số ĐT..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-full glass-card border border-slate-200/80 dark:border-slate-700 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-primary/40 text-content-main placeholder:text-content-muted"
          />
        </div>

        {/* Level Filters & Sort */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-full text-xs font-bold">
            {["ALL", "HSK1", "HSK2", "HSK3"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  levelFilter === lvl
                    ? "bg-white dark:bg-slate-900 text-primary shadow-sm"
                    : "text-content-muted hover:text-content-main"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3.5 py-2 rounded-full glass-card border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-content-main outline-none"
          >
            <option value="score">Sắp xếp: Điểm cao nhất</option>
            <option value="streak">Sắp xếp: Chuỗi Streak</option>
            <option value="name">Sắp xếp: Tên A-Z</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="glass-card rounded-3xl border border-white/80 dark:border-white/10 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-800/70 border-b border-slate-200/60 dark:border-slate-800 text-content-muted font-bold">
                <th className="py-4 px-6">Học Viên</th>
                <th className="py-4 px-4">Lớp Học</th>
                <th className="py-4 px-4">Trình Độ</th>
                <th className="py-4 px-4">Chuỗi Streak</th>
                <th className="py-4 px-4">Điểm TB</th>
                <th className="py-4 px-4">Bài Tập Về Nhà</th>
                <th className="py-4 px-6 text-right">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.map((stu) => (
                <tr
                  key={stu.id}
                  className="hover:bg-white/60 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs shrink-0">
                        {stu.name.split(" ").slice(-1)[0]}
                      </div>
                      <div>
                        <div className="font-bold text-content-main flex items-center gap-1.5">
                          <span>{stu.name}</span>
                          <span className="font-hanzi text-primary text-xs">
                            ({stu.chineseName})
                          </span>
                        </div>
                        <span className="text-[11px] text-content-muted">
                          {stu.phone}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className="text-content-muted text-xs font-medium">
                      {stu.class}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <Badge variant="primary" size="sm">
                      {stu.level}
                    </Badge>
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <Flame className="w-4 h-4 fill-current text-amber-500" />
                      {stu.streak} ngày
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`font-black px-2.5 py-1 rounded-full text-xs ${
                        stu.score >= 90
                          ? "bg-emerald-500/15 text-emerald-600"
                          : stu.score >= 80
                          ? "bg-sky-500/15 text-sky-600"
                          : "bg-amber-500/15 text-amber-600"
                      }`}
                    >
                      {stu.score} / 100
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        stu.homeworkStatus === "graded"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : stu.homeworkStatus === "submitted"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      {stu.homeworkStatus === "graded"
                        ? "Đã chấm điểm"
                        : stu.homeworkStatus === "submitted"
                        ? "Đã nộp bài"
                        : "Chưa nộp"}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => alert(`Gửi tin nhắn Zalo tới ${stu.name}`)}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-content-muted hover:text-primary transition-colors"
                        title="Gửi tin nhắn"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
