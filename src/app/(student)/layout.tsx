"use client";

import React from "react";
import { Topbar } from "@/components/layout/Topbar";
import { MobileNav } from "@/components/layout/MobileNav";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Theme Wallpaper for Student Portal */}
      <div className="wallpaper-bg" aria-hidden="true" />
      <div className="wallpaper-overlay" aria-hidden="true" />

      <Topbar />
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pb-24 lg:pb-12 relative z-10">
        {children}
      </div>
      <MobileNav />
    </div>
  );
}
