"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { Palette, Moon, Sun, Check, X } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, setThemeId, isDark, toggleDark, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        {/* Dark mode button */}
        <button
          onClick={toggleDark}
          className="w-10 h-10 rounded-full glass-card border border-white/60 dark:border-white/10 flex items-center justify-center text-content-main hover:scale-105 active:scale-95 transition-all shadow-sm"
          title={isDark ? "Chuyển sang chế độ ban ngày" : "Chuyển sang chế độ ban đêm"}
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
        </button>

        {/* Theme palette picker button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-10 px-3.5 rounded-full glass-card border border-white/60 dark:border-white/10 flex items-center gap-2 text-content-main hover:scale-105 active:scale-95 transition-all shadow-sm text-xs font-semibold"
          title="Đổi chủ đề hình nền và màu sắc"
          aria-label="Theme selector"
        >
          <Palette className="w-4 h-4 text-primary" />
          <span className="hidden md:inline">{theme.name}</span>
          <span
            className="w-3.5 h-3.5 rounded-full border border-white shadow-sm shrink-0"
            style={{ backgroundColor: theme.primary }}
          />
        </button>
      </div>

      {/* Theme Drawer / Modal */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 glass-card bg-white/95 dark:bg-slate-900/95 border border-white/60 dark:border-white/10 rounded-3xl p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-primary" />
                <h4 className="font-bold text-sm text-content-main">
                  Bộ Sưu Tập Hình Nền & Theme
                </h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-content-muted hover:text-content-main"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-content-muted">
              Chọn một hình nền để đổi ngay không gian học tập và sắc thái toàn hệ thống:
            </p>

            <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
              {availableThemes.map((t) => {
                const isSelected = t.id === theme.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setThemeId(t.id);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "p-3 rounded-2xl border text-left transition-all duration-200 space-y-2 relative overflow-hidden group cursor-pointer",
                      isSelected
                        ? "border-primary bg-primary/10 shadow-md ring-2 ring-primary/30"
                        : "border-slate-200/80 dark:border-slate-700 hover:border-primary/50 bg-white/70 dark:bg-slate-800/60"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="w-5 h-5 rounded-full border border-white shadow-sm shrink-0"
                        style={{ backgroundColor: t.primary }}
                      />
                      {isSelected && (
                        <Check className="w-4 h-4 text-primary shrink-0" />
                      )}
                    </div>

                    <div>
                      <h5 className="font-bold text-xs text-content-main truncate">
                        {t.name}
                      </h5>
                      <span className="text-[11px] font-hanzi text-primary block truncate">
                        {t.hanziName}
                      </span>
                    </div>

                    <p className="text-[10px] text-content-muted line-clamp-2 leading-tight">
                      {t.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
