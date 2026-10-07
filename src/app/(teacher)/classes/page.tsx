"use client";

import React, { useState } from "react";
import { CLASSES_LIST, ClassInfo } from "@/data/classes";
import { STUDENTS_LIST } from "@/data/students";
import { GlassCard } from "@/components/ui/GlassCard";
import { PillButton } from "@/components/ui/PillButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Modal } from "@/components/ui/Modal";
import { GraduationCap, Users, Calendar, Clock, Plus, Search } from "lucide-react";

export default function ClassesManagementPage() {
  const [filter, setFilter] = useState<string>("ALL");
  const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredClasses =
    filter === "ALL"
      ? CLASSES_LIST
      : CLASSES_LIST.filter((c) => c.status === filter);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/15 text-primary font-hanzi font-bold flex items-center justify-center text-sm">
              班
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-content-main">
              Quản Lý Lớp Học (班级管理)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-content-muted mt-1">
            Theo dõi tiến độ giảng dạy, sĩ số lớp, lịch học và phòng học trực tuyến.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <PillButton
            variant="accent"
            size="sm"
            icon={<Plus className="w-4 h-4 text-slate-950" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Tạo Lớp Mới
          </PillButton>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full w-fit text-xs font-bold">
        {[
          { id: "ALL", label: "Tất cả lớp" },
          { id: "active", label: "Đang hoạt động" },
          { id: "upcoming", label: "Sắp khai giảng" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
              filter === tab.id
                ? "bg-white dark:bg-slate-900 text-primary shadow-sm"
                : "text-content-muted hover:text-content-main"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClasses.map((cls) => (
          <GlassCard
            key={cls.id}
            hoverable
            onClick={() => setSelectedClass(cls)}
            className="p-6 rounded-3xl border border-white/80 dark:border-white/10 shadow-lg space-y-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[11px] font-hanzi font-semibold text-primary">
                  {cls.chineseName}
                </span>
                <h3 className="text-lg font-bold text-content-main">
                  {cls.name}
                </h3>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  cls.status === "active"
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                    : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                }`}
              >
                {cls.status === "active" ? "Đang mở" : "Sắp mở"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-content-muted">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/60 dark:bg-slate-800/60">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>{cls.schedule}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/60 dark:bg-slate-800/60">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>{cls.time}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/60 dark:bg-slate-800/60">
                <Users className="w-3.5 h-3.5 text-accent" />
                <span>
                  Sĩ số: {cls.studentCount}/{cls.maxStudents}
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/60 dark:bg-slate-800/60">
                <GraduationCap className="w-3.5 h-3.5 text-accent" />
                <span className="truncate">{cls.teacher}</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs font-semibold text-content-muted">
                <span>Tiến độ khóa học</span>
                <span>{cls.progressPercentage}%</span>
              </div>
              <ProgressBar value={cls.progressPercentage} />
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-xs font-semibold">
              <span className="text-content-muted">Phòng: {cls.room}</span>
              <span className="text-primary hover:underline">
                Xem danh sách học viên →
              </span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Class Details Modal */}
      {selectedClass && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedClass(null)}
          title={`Chi tiết: ${selectedClass.name}`}
          maxWidth="lg"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-sky-50 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 space-y-1">
              <p className="text-xs text-primary font-bold">
                {selectedClass.chineseName}
              </p>
              <p className="text-xs text-content-muted">
                Lịch học: {selectedClass.schedule} ({selectedClass.time}) • Giảng viên: {selectedClass.teacher}
              </p>
            </div>

            <h4 className="font-bold text-sm text-content-main">
              Danh Sách Học Viên Trong Lớp ({selectedClass.studentCount} bạn)
            </h4>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {STUDENTS_LIST.map((stu) => (
                <div
                  key={stu.id}
                  className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                      {stu.chineseName[0]}
                    </span>
                    <div>
                      <p className="font-bold text-content-main">
                        {stu.name} ({stu.chineseName})
                      </p>
                      <p className="text-[11px] text-content-muted">{stu.phone}</p>
                    </div>
                  </div>

                  <span className="font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
                    Điểm: {stu.score}/100
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 flex justify-end">
              <PillButton
                variant="primary"
                size="sm"
                onClick={() => setSelectedClass(null)}
              >
                Đóng
              </PillButton>
            </div>
          </div>
        </Modal>
      )}

      {/* Create New Class Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tạo Lớp Học Trực Tuyến Mới"
        maxWidth="md"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Đã tạo lớp học mới thành công!");
            setIsAddModalOpen(false);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-bold text-content-main mb-1">
              Tên Lớp Học (Tiếng Việt)
            </label>
            <input
              type="text"
              required
              placeholder="VD: Lớp HSK 2 Cấp Tốc Buổi Tối"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-primary/40 text-content-main"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-content-main mb-1">
              Tên Chữ Hán
            </label>
            <input
              type="text"
              required
              placeholder="VD: HSK 2 速成班"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-primary/40 text-content-main"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-content-main mb-1">
                Lịch Học
              </label>
              <input
                type="text"
                placeholder="Thứ 2, 4, 6"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-primary/40 text-content-main"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-content-main mb-1">
                Khung Giờ
              </label>
              <input
                type="text"
                placeholder="18:30 - 20:30"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-primary/40 text-content-main"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <PillButton
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Hủy
            </PillButton>
            <PillButton type="submit" variant="primary" size="sm">
              Lưu Lớp Học
            </PillButton>
          </div>
        </form>
      </Modal>
    </div>
  );
}
