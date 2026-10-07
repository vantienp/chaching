import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Cha Ching (米米汉语) — Nền Tảng Học Tiếng Trung Trực Tuyến",
  description:
    "Góc học tập tiếng Trung thông minh và sáng tạo phong cách Stationery Metaphor. Luyện HSK, Flashcard 3D, Ô chữ Mễ, Video song ngữ và Quản lý lớp học chuyên nghiệp.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" data-theme="sky-blue" data-mode="light" suppressHydrationWarning>
      <body className="antialiased min-h-screen relative">
        <ThemeProvider>
          {/* Main App Content */}
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
