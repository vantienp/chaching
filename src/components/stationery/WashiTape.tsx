"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface WashiTapeProps {
  color?: "amber" | "rose" | "emerald" | "sky" | "indigo";
  className?: string;
}

export function WashiTape({ color = "amber", className }: WashiTapeProps) {
  const colorMap = {
    amber: "bg-amber-400/70 border-amber-300",
    rose: "bg-pink-400/70 border-pink-300",
    emerald: "bg-emerald-400/70 border-emerald-300",
    sky: "bg-sky-400/70 border-sky-300",
    indigo: "bg-indigo-400/70 border-indigo-300",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-4 w-20 shadow-sm backdrop-blur-sm relative select-none pointer-events-none",
        "border-l border-r border-dashed border-white/80",
        colorMap[color],
        className
      )}
      style={{
        transform: "rotate(-1deg)",
        opacity: 0.88,
      }}
    />
  );
}
