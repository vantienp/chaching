"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, BookOpen, Headphones, Video, PenTool } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();

  // If user is inside teacher hub, don't show the student bottom nav
  if (
    pathname.startsWith("/overview") ||
    pathname.startsWith("/classes") ||
    pathname.startsWith("/students") ||
    pathname.startsWith("/attendance")
  ) {
    return null;
  }

  const items = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/vocabulary", label: "Từ vựng", icon: BookOpen },
    { href: "/listening", label: "Nghe", icon: Headphones },
    { href: "/video", label: "Video", icon: Video },
    { href: "/exercises", label: "Bài tập", icon: PenTool },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-3 left-4 right-4 z-40"
    >
      <div className="glass-card bg-white/95 dark:bg-slate-900/95 border border-white/80 dark:border-white/10 px-3 py-2 rounded-full shadow-2xl flex items-center justify-around">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center min-w-[48px] min-h-[44px] px-2 py-1 rounded-2xl transition-all select-none text-[10px] font-bold",
                isActive
                  ? "text-primary scale-105"
                  : "text-content-muted hover:text-content-main"
              )}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
