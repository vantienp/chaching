"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StickyNoteProps {
  color?: "yellow" | "pink" | "green" | "blue";
  tilt?: "left" | "right" | "none";
  className?: string;
  title?: string;
  children: ReactNode;
}

export function StickyNote({
  color = "yellow",
  tilt = "left",
  className,
  title,
  children,
}: StickyNoteProps) {
  const colorMap = {
    yellow: "bg-amber-100 dark:bg-amber-950/60 text-amber-950 dark:text-amber-100 border-amber-200/60",
    pink: "bg-pink-100 dark:bg-pink-950/60 text-pink-950 dark:text-pink-100 border-pink-200/60",
    green: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-100 border-emerald-200/60",
    blue: "bg-sky-100 dark:bg-sky-950/60 text-sky-950 dark:text-sky-100 border-sky-200/60",
  };

  const tiltMap = {
    left: "-rotate-1 hover:rotate-0",
    right: "rotate-1 hover:rotate-0",
    none: "rotate-0",
  };

  return (
    <div
      className={cn(
        "sticky-note border shadow-md transition-all duration-200 rounded-2xl relative",
        colorMap[color],
        tiltMap[tilt],
        className
      )}
    >
      {/* Pin or fold accent */}
      <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-black/10 dark:bg-white/10" />

      {title && (
        <h4 className="font-bold text-sm mb-2 flex items-center gap-1.5 opacity-90">
          <span>📌</span>
          <span>{title}</span>
        </h4>
      )}

      <div className="text-xs sm:text-sm leading-relaxed opacity-95">
        {children}
      </div>
    </div>
  );
}
