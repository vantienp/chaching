"use client";

import React from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { WashiTape } from "@/components/stationery/WashiTape";
import {
  Layers,
  Headphones,
  Video,
  PenTool,
  TrendingUp,
  Palette,
  ArrowRight,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Layers,
      title: "Flashcard 3D Lật Thẻ",
      hanzi: "三维生词卡",
      color: "sky",
      description:
        "Hiệu ứng chiều sâu không gian 3D, lật thẻ siêu mượt với phím Space. Đầy đủ âm Hán Việt, phát âm và câu ví dụ.",
      link: "/vocabulary",
    },
    {
      icon: Headphones,
      title: "Luyện Nghe Chuẩn Bắc Kinh",
      hanzi: "北京标准发音",
      color: "emerald",
      description:
        "Trình phát âm thanh kèm 5 cột sóng âm nhấp nhô, tùy chỉnh tốc độ 0.75x - 1.25x và trắc nghiệm chọn thanh điệu Pinyin.",
      link: "/listening",
    },
    {
      icon: Video,
      title: "Video Song Ngữ Dual-Sub",
      hanzi: "中越双语字幕",
      color: "amber",
      description:
        "Vừa xem video tình huống đời sống vừa đối chiếu phụ đề song ngữ Trung - Việt, highlight từ khóa và bookmark câu hay.",
      link: "/video",
    },
    {
      icon: PenTool,
      title: "Luyện Viết Ô Chữ Mễ (米字格)",
      hanzi: "米字格临摹",
      color: "rose",
      description:
        "Canvas vẽ cảm ứng mô phỏng giấy tập viết cổ điển với đường căn nét đứt chuẩn mực, giúp ghi nhớ nét bút thuận dễ dàng.",
      link: "/exercises",
    },
    {
      icon: TrendingUp,
      title: "Theo Dõi Tiến Độ & Streak",
      hanzi: "每日打卡勋章",
      color: "purple",
      description:
        "Tích lũy chuỗi ngày học liên tục, nhận con dấu son thưởng '太棒了!' và pháo hoa rực rỡ khi hoàn thành bài tập.",
      link: "/dashboard",
    },
    {
      icon: Palette,
      title: "Theme Engine Cá Nhân Hóa",
      hanzi: "多主题随心变",
      color: "sky",
      description:
        "5 bộ hình nền thiên nhiên chuẩn Stationery (Bầu Trời Xanh, Anh Đào, Thanh Trúc, Cổ Phong, Nắng Xuân). Chọn nền là toàn bộ màu UI tự động đổi theo.",
      link: "/overview",
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-10 scroll-mt-20">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">
          Tính Năng Đột Phá
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-content-main tracking-tight">
          Góc Học Tập Đầy Cảm Hứng Cho Gen Z
        </h2>
        <p className="text-sm sm:text-base text-content-muted leading-relaxed">
          Tạm biệt những phần mềm quản trị khô khan. Tại Cha Ching, mỗi tính năng đều được chăm chút theo nghệ thuật giấy vở Stationery Metaphor.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, i) => {
          const Icon = feat.icon;

          return (
            <GlassCard
              key={i}
              hoverable
              className="p-6 sm:p-7 flex flex-col justify-between space-y-5 border border-white/80 dark:border-white/10 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>
                  <WashiTape
                    color={i % 2 === 0 ? "amber" : "rose"}
                    className="opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-hanzi font-semibold text-primary">
                    {feat.hanzi}
                  </span>
                  <h3 className="text-xl font-bold text-content-main group-hover:text-primary transition-colors">
                    {feat.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-content-muted leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href={feat.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform"
                >
                  <span>Khám phá ngay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
