"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PaperClip } from "./PaperClip";

interface RuledPaperCardProps {
  children: ReactNode;
  className?: string;
  withClip?: boolean;
  withBinderHoles?: boolean;
}

export function RuledPaperCard({
  children,
  className,
  withClip = true,
  withBinderHoles = true,
}: RuledPaperCardProps) {
  return (
    <div
      className={cn(
        "ruled-paper relative rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/60 shadow-lg",
        withBinderHoles && "pl-10 sm:pl-12",
        className
      )}
    >
      {withClip && <PaperClip color="gold" position="top-right" />}

      {/* Binder holes on the left margin */}
      {withBinderHoles && (
        <div
          aria-hidden="true"
          className="absolute left-3 sm:left-4 top-8 bottom-8 flex flex-col justify-around pointer-events-none"
        >
          <div className="w-3.5 h-3.5 rounded-full bg-slate-300 dark:bg-slate-700 shadow-inner border border-slate-400/40" />
          <div className="w-3.5 h-3.5 rounded-full bg-slate-300 dark:bg-slate-700 shadow-inner border border-slate-400/40" />
          <div className="w-3.5 h-3.5 rounded-full bg-slate-300 dark:bg-slate-700 shadow-inner border border-slate-400/40" />
        </div>
      )}

      {children}
    </div>
  );
}
