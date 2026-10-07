"use client";

import React from "react";
import { StickyNote } from "@/components/stationery/StickyNote";
import { Star } from "lucide-react";

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Nguyễn Minh Anh",
      title: "Học viên HSK 3 • Sinh viên ĐH Ngoại Thương",
      color: "yellow" as const,
      tilt: "left" as const,
      text: "Mình từng sợ chữ Hán kinh khủng vì quá nhiều nét khó nhớ. Từ ngày học trên Cha Ching, tính năng lật flashcard 3D và ô chữ Mễ giúp mình thuộc từ siêu nhanh! Thích nhất là được đổi hình nền hoa đào mỗi khi học đêm.",
    },
    {
      name: "Trần Tuấn Kiệt",
      title: "Học viên HSK 2 • Lập trình viên",
      color: "blue" as const,
      tilt: "right" as const,
      text: "Giao diện đỉnh chóp! Nút bấm pill bo tròn và hiệu ứng kính mờ nhìn rất hiện đại, không bị nặng nề như mấy app cũ. Mỗi lần làm xong bài tập nộp có con dấu son dập xuống với bắn pháo hoa làm mình có động lực duy trì chuỗi Streak 22 ngày liên tục.",
    },
    {
      name: "Cô Vương Linh (王玲)",
      title: "Giáo viên Tiếng Trung • 6 năm kinh nghiệm",
      color: "pink" as const,
      tilt: "left" as const,
      text: "Hub giáo viên giúp tôi quản lý 4 lớp học cực kỳ nhàn. Điểm danh chỉ với 1 cú chạm, học viên nộp bài nghe phát âm qua hệ thống chấm điểm trực quan. Phụ huynh rất hài lòng khi thấy các em hào hứng học mỗi ngày.",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto space-y-10">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">
          Cảm Nhận Học Viên & Giáo Viên
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-content-main tracking-tight">
          Học Tập Thật Vui, Kết Quả Vượt Trội
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {testimonials.map((t, idx) => (
          <StickyNote
            key={idx}
            color={t.color}
            tilt={t.tilt}
            className="p-6 sm:p-7 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-medium leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>

            <div className="pt-3 border-t border-black/10 dark:border-white/10">
              <h5 className="font-bold text-sm text-content-main">{t.name}</h5>
              <p className="text-[11px] text-content-muted">{t.title}</p>
            </div>
          </StickyNote>
        ))}
      </div>
    </section>
  );
}
