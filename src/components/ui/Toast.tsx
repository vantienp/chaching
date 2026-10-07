"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export interface ToastProps {
  show: boolean;
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

export function Toast({
  show,
  message,
  type = "success",
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  if (!show) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-primary shrink-0" />,
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 glass-card shadow-xl rounded-2xl border border-white/60 dark:border-white/10 animate-in slide-in-from-bottom-5 duration-300 max-w-sm"
      )}
    >
      {icons[type]}
      <p className="text-sm font-medium text-content-main leading-tight">
        {message}
      </p>
      <button
        onClick={onClose}
        aria-label="Đóng thông báo"
        className="p-1 -mr-2 text-content-muted hover:text-content-main"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
