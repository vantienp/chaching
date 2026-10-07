"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PaperClipProps {
  className?: string;
  color?: "silver" | "gold" | "rose-gold";
  position?: "top-left" | "top-right";
}

export function PaperClip({
  className,
  color = "silver",
  position = "top-left",
}: PaperClipProps) {
  const colorFills = {
    silver: "stroke-slate-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]",
    gold: "stroke-amber-500 drop-shadow-[0_2px_4px_rgba(245,158,11,0.25)]",
    "rose-gold": "stroke-rose-400 drop-shadow-[0_2px_4px_rgba(244,63,94,0.2)]",
  };

  const posClasses = {
    "top-left": "-top-3.5 left-6 -rotate-12",
    "top-right": "-top-3.5 right-6 rotate-12",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute z-10 pointer-events-none transition-transform hover:scale-110",
        posClasses[position],
        className
      )}
    >
      <svg
        width="28"
        height="36"
        viewBox="0 0 24 32"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={colorFills[color]}
      >
        <path d="M12 28V8a6 6 0 0 1 12 0v18a8 8 0 0 1-16 0V10a4 4 0 0 1 8 0v14" />
      </svg>
    </div>
  );
}
