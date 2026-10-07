"use client";

import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
}

export const PillButton = forwardRef<HTMLButtonElement, PillButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "h-9 px-4 text-xs font-semibold",
      md: "h-11 px-6 text-sm font-semibold",
      lg: "h-13 px-8 text-base font-bold",
    };

    const variantClasses = {
      primary:
        "bg-primary text-white shadow-[0_4px_16px_rgba(14,165,233,0.25)] hover:bg-primary-hover hover:shadow-[0_8px_24px_rgba(14,165,233,0.35)]",
      secondary:
        "bg-white/80 dark:bg-slate-800/80 text-content-main border border-white/60 dark:border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:bg-white dark:hover:bg-slate-800",
      accent:
        "bg-accent text-slate-900 shadow-[0_4px_16px_rgba(245,158,11,0.25)] hover:brightness-105 hover:shadow-[0_8px_24px_rgba(245,158,11,0.35)]",
      outline:
        "bg-transparent text-primary border-2 border-primary hover:bg-primary/10",
      ghost:
        "bg-transparent text-content-main hover:bg-black/5 dark:hover:bg-white/5",
      danger:
        "bg-rose-500 text-white shadow-[0_4px_16px_rgba(244,63,94,0.25)] hover:bg-rose-600",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "pill-btn transition-all duration-200 select-none",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin mr-1" />
        ) : (
          icon && <span className="inline-flex shrink-0">{icon}</span>
        )}
        <span>{children}</span>
      </button>
    );
  }
);

PillButton.displayName = "PillButton";
