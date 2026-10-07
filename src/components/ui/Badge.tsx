"use client";

import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "accent" | "success" | "warning" | "danger" | "neutral" | "hsk";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    primary: "bg-primary/15 text-primary border border-primary/20",
    accent: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/20",
    success: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20",
    warning: "bg-orange-500/15 text-orange-700 dark:text-orange-400 border border-orange-500/20",
    danger: "bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-500/20",
    neutral: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-500/15",
    hsk: "bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold shadow-sm",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs font-semibold",
    md: "px-3 py-1 text-xs font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
