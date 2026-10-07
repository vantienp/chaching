"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { BookOpen, Headphones, Video, BookMarked, PenTool, LayoutDashboard, UserCheck, Flame } from "lucide-react";

export function Topbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Tổng quan", icon: LayoutDashboard },
    { href: "/vocabulary", label: "Từ vựng", icon: BookOpen },
    { href: "/listening", label: "Luyện nghe", icon: Headphones },
    { href: "/video", label: "Video song ngữ", icon: Video },
    { href: "/grammar", label: "Ngữ pháp", icon: BookMarked },
    { href: "/exercises", label: "Bài tập", icon: PenTool },
  ];

  return (
    <header className="sticky top-4 z-40 px-4 sm:px-6 mb-6">
      <div className="max-w-7xl mx-auto glass-card bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/80 dark:border-white/10 px-4 sm:px-6 py-3 rounded-full shadow-xl flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-sky-400 text-white flex items-center justify-center font-bold text-lg font-hanzi shadow-md group-hover:scale-105 transition-transform">
            米
          </div>
          <div className="hidden sm:block leading-tight">
            <span className="font-extrabold text-base text-content-main tracking-tight group-hover:text-primary transition-colors block">
              Cha Ching
            </span>
            <span className="text-[11px] font-hanzi text-content-muted block">
              米米汉语 • Học Tiếng Trung
            </span>
          </div>
        </Link>

        {/* Navigation Items (Desktop Pill Nav) */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/60 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-700/50">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 select-none",
                  isActive
                    ? "bg-white dark:bg-slate-900 text-primary shadow-sm"
                    : "text-content-muted hover:text-content-main hover:bg-white/50 dark:hover:bg-slate-800"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Actions Right */}
        <div className="flex items-center gap-3">
          {/* Streak mini badge */}
          <Link
            href="/dashboard"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-xs font-bold shadow-xs hover:scale-105 transition-transform"
            title="Chuỗi ngày học"
          >
            <Flame className="w-4 h-4 fill-current text-amber-500 animate-pulse" />
            <span>15 ngày</span>
          </Link>

          {/* Teacher Hub switch link */}
          <Link
            href="/overview"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-primary bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
            title="Chuyển sang giao diện Giáo viên"
          >
            <UserCheck className="w-3.5 h-3.5 text-primary" />
            <span>Hub Giáo Viên</span>
          </Link>

          {/* Theme Switcher */}
          <ThemeSwitcher />

          {/* Student Profile Avatar */}
          <Link
            href="/dashboard"
            className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary text-primary font-bold text-xs flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
            title="Tài khoản: Minh Anh"
          >
            MA
          </Link>
        </div>
      </div>
    </header>
  );
}
