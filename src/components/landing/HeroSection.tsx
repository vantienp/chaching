"use client";

import React from "react";
import { SkyCanvas } from "./SkyCanvas";

export function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden select-none">
      {/* ==================== 1. VISUAL FOUNDATION (99% REFERENCE FIDELITY) ==================== */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out"
        style={{
          backgroundImage: "url('/wallpapers/background_image.jpg')",
        }}
      >
        {/* Subtle atmospheric twilight breathing glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/20 pointer-events-none" />
      </div>

      {/* ==================== 2. LIVING ANIMATED CANVAS ==================== */}
      {/* Active flying jet, streaming contrail vapor, twinkling starfield, shooting stars & stardust */}
      <SkyCanvas />

      {/* ==================== 3. MINIMAL SLEEK SCROLL INDICATOR ==================== */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20">
        <a
          href="#features"
          className="flex flex-col items-center gap-2 text-white/75 hover:text-white transition-all group cursor-pointer drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          aria-label="Cuộn xuống để xem tính năng"
        >
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase">
            Khám phá tính năng
          </span>
          <div className="w-5 h-9 rounded-full border-2 border-white/50 group-hover:border-white flex items-start justify-center p-1 transition-colors">
            <div className="w-1 h-2 rounded-full bg-white animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}
