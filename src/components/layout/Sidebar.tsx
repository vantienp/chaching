"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  ArrowLeft,
  Menu,
  X,
  BookOpen,
} from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const teacherNav = [
    { href: "/overview", label: "Tổng quan Hub", icon: LayoutDashboard },
    { href: "/classes", label: "Quản lý Lớp học", icon: GraduationCap },
    { href: "/students", label: "Học viên & Sổ điểm", icon: Users },
    { href: "/attendance", label: "Điểm danh nhanh", icon: CalendarCheck },
  ];

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-11 h-11 rounded-full glass-card border border-white/60 dark:border-white/10 flex items-center justify-center text-content-main shadow-md"
          aria-label="Toggle Teacher Navigation"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop for Mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 w-64 glass-card rounded-r-3xl border-r border-white/80 dark:border-white/10 p-6 flex flex-col justify-between shadow-xl transition-transform duration-300",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="space-y-6">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary to-sky-400 text-white flex items-center justify-center font-bold text-xl font-hanzi shadow-md group-hover:scale-105 transition-transform">
              米
            </div>
            <div>
              <span className="font-extrabold text-base text-content-main tracking-tight group-hover:text-primary transition-colors block">
                Cha Ching
              </span>
              <span className="text-xs font-semibold text-primary block">
                Hub Giáo Viên 👩‍🏫
              </span>
            </div>
          </Link>

          {/* Teacher Info Card */}
          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-600 font-bold flex items-center justify-center text-xs">
              王玲
            </div>
            <div className="min-w-0">
              <h5 className="font-bold text-xs text-content-main truncate">
                Cô Vương Linh
              </h5>
              <p className="text-[11px] text-content-muted truncate">
                Giáo viên HSK Cao cấp
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <span className="text-[11px] font-bold text-content-muted uppercase tracking-wider px-3 block">
              Quản Trị Lớp Học
            </span>

            {teacherNav.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all select-none",
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/25 font-bold"
                      : "text-content-muted hover:text-content-main hover:bg-white/60 dark:hover:bg-slate-800/60"
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-content-muted">
              Theme / Tối
            </span>
            <ThemeSwitcher />
          </div>

          {/* Return to Student Portal button */}
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-content-main text-xs font-bold transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Về Cổng Học Viên</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
