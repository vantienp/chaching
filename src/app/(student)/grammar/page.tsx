"use client";

import React, { useState } from "react";
import { GRAMMAR_LIST, GrammarPoint } from "@/data/grammar";
import { GrammarCard } from "@/components/learning/GrammarCard";
import { StickyNote } from "@/components/stationery/StickyNote";
import { BookMarked, Search, Sparkles } from "lucide-react";

export default function GrammarPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredGrammar = GRAMMAR_LIST.filter((g) => {
    const matchesLevel =
      selectedLevel === "ALL" || g.level === selectedLevel;
    const matchesSearch =
      g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.structure.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-purple-500/15 text-purple-600 font-hanzi font-bold flex items-center justify-center text-sm">
              法
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-content-main">
              Ngữ Pháp Trọng Điểm HSK (语法精讲)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-content-muted mt-1">
            Tổng hợp các cấu trúc câu cốt lõi, ví dụ thực tế và mẹo ghi nhớ nhanh của giáo viên.
          </p>
        </div>

        {/* Level filter tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full text-xs font-bold">
          {["ALL", "HSK1", "HSK2", "HSK3"].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                selectedLevel === lvl
                  ? "bg-white dark:bg-slate-900 text-primary shadow-sm"
                  : "text-content-muted hover:text-content-main"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Search bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-content-muted absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Tìm kiếm ngữ pháp (ví dụ: chữ 把, câu chữ 是...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 rounded-full glass-card border border-slate-200/80 dark:border-slate-700 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-primary/40 text-content-main placeholder:text-content-muted"
        />
      </div>

      {/* Grammar Cards List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Cards List (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {filteredGrammar.length > 0 ? (
            filteredGrammar.map((grammar) => (
              <GrammarCard key={grammar.id} grammar={grammar} />
            ))
          ) : (
            <div className="text-center py-12 glass-card rounded-3xl text-content-muted text-sm">
              Không tìm thấy điểm ngữ pháp phù hợp với từ khóa &ldquo;{searchTerm}&rdquo;.
            </div>
          )}
        </div>

        {/* Right: Study Sticky Notes (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <StickyNote
            color="yellow"
            tilt="right"
            title="Nguyên Tắc Trật Tự Từ Trong Tiếng Trung"
          >
            <p className="font-semibold text-content-main mb-1">
              Thời gian & Địa điểm luôn đứng TRƯỚC Động từ:
            </p>
            <p className="text-xs text-primary font-mono mb-2">
              Chủ ngữ + [Thời gian] + [Địa điểm] + Động từ + Tân ngữ
            </p>
            <p className="text-xs italic text-content-muted">
              Ví dụ: 我明天在学校学中文。(Tôi ngày mai ở trường học tiếng Trung.)
            </p>
          </StickyNote>

          <StickyNote
            color="green"
            tilt="left"
            title="Quy Tắc Dùng Trợ Từ '的' (de)"
          >
            <p>
              Dùng để chỉ quan hệ sở hữu hoặc định ngữ bổ nghĩa cho danh từ:
            </p>
            <p className="text-xs font-semibold text-content-main mt-1">
              Định ngữ + 的 + Trung tâm ngữ
            </p>
            <p className="text-xs text-content-muted mt-1">
              Ví dụ: 我的老师 (Thầy giáo của tôi), 漂亮的衣服 (Bộ quần áo đẹp).
            </p>
          </StickyNote>
        </div>
      </div>
    </div>
  );
}
