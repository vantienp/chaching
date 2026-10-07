"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface StampSealProps {
  text?: string;
  subText?: string;
  variant?: "score100" | "excellent" | "checked" | "custom";
  className?: string;
  animate?: boolean;
}

export function StampSeal({
  text,
  subText,
  variant = "excellent",
  className,
  animate = true,
}: StampSealProps) {
  const configs = {
    score100: { text: "100分", subText: "满分通过" },
    excellent: { text: "太棒了!", subText: "XUẤT SẮC" },
    checked: { text: "打卡成功", subText: "STREAK +1" },
    custom: { text: text || "优秀", subText: subText || "CHĂM CHỈ" },
  };

  const current = configs[variant];

  return (
    <div
      className={cn(
        "stamp-seal relative flex flex-col items-center justify-center p-2 text-center select-none",
        animate && "animate-stamp",
        className
      )}
    >
      <div className="absolute inset-1 border border-dashed border-red-400 rounded-full pointer-events-none" />
      <span className="text-xl sm:text-2xl font-bold font-calligraphy text-red-600 leading-none">
        {current.text}
      </span>
      {current.subText && (
        <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest mt-1">
          {current.subText}
        </span>
      )}
    </div>
  );
}
