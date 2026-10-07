"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex relative">
      {/* Theme Wallpaper for Teacher Hub */}
      <div className="wallpaper-bg" aria-hidden="true" />
      <div className="wallpaper-overlay" aria-hidden="true" />

      {/* 240px Fixed/Collapsible Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-8 max-w-7xl w-full relative z-10">
        <div className="pt-12 lg:pt-0">{children}</div>
      </main>
    </div>
  );
}
