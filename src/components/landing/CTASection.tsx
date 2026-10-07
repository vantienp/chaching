"use client";

import React from "react";
import Link from "next/link";
import { PillButton } from "@/components/ui/PillButton";
import { PaperClip } from "@/components/stationery/PaperClip";
import { Sparkles, MessageCircle, Phone, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="relative bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-900 text-white p-8 sm:p-14 rounded-[36px] shadow-2xl border border-sky-400/30 overflow-hidden text-center space-y-6">
        <PaperClip color="gold" position="top-right" />

        {/* Ambient glow circles */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-white/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ưu Đãi Khóa Học Mới</span>
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow-sm">
            Bắt Đầu Hành Trình Chinh Phục Hán Ngữ Ngay Hôm Nay
          </h2>

          <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl mx-auto">
            Trải nghiệm trọn vẹn phương pháp học tiếng Trung hiện đại, không áp lực và tràn đầy cảm hứng thẩm mỹ cùng Cha Ching.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link href="/dashboard">
            <PillButton
              variant="accent"
              size="lg"
              icon={<ArrowRight className="w-5 h-5 text-slate-950" />}
              className="text-slate-950 font-black shadow-xl"
            >
              Vào Học Thử Miễn Phí
            </PillButton>
          </Link>

          <a
            href="tel:0912345678"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-sm transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Hotline Tư Vấn: 0912 345 678</span>
          </a>
        </div>

        {/* Brand note footer */}
        <div className="relative z-10 pt-8 mt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between text-xs text-white/80 gap-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-white text-primary font-hanzi font-bold flex items-center justify-center text-xs">
              米
            </span>
            <span>Cha Ching (米米汉语) — Bản Quyền Prototype © 2026</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hover:underline">
              Cổng Học Viên
            </Link>
            <Link href="/overview" className="hover:underline">
              Hub Giáo Viên
            </Link>
            <Link href="/vocabulary" className="hover:underline">
              Sổ Tay Từ Vựng
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
