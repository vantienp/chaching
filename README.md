# Cha Ching (米米汉语) — Next.js Prototype v1.0

> Nền tảng học tiếng Trung trực tuyến sáng tạo phong cách **Stationery Metaphor** (Bàn học / Sổ tay thông minh).

---

## 1. Tổng Quan Dự Án

- **Tên dự án**: Cha Ching Web ZH (米米汉语)
- **Công nghệ**: Next.js 14 (App Router) + Tailwind CSS + TypeScript + Lucide React
- **Dữ liệu**: 100% Mock Data tĩnh, chạy mượt mà độc lập không cần backend
- **Triết lý thiết kế**:
  - **Stationery Metaphor**: Thẩm mỹ bàn học với giấy kẻ ngang, sticky notes nghiêng, washi tape, kẹp giấy và con dấu son đỏ thưởng.
  - **Wallpaper-Driven Theme Engine**: 6 bộ hình nền phong cảnh thiên nhiên, chọn hình nền là toàn bộ hệ thống biến CSS tự động chuyển đổi.
  - **Glassmorphism**: Thẻ kính mờ 4 lớp nhìn xuyên thấu ảnh nền nghệ thuật.
  - **Pill Buttons**: Nút bấm bo tròn tuyệt đối (chuẩn HapoStudio).

---

## 2. Hướng Dẫn Cài Đặt & Khởi Chạy

Dự án sử dụng môi trường Node.js chuẩn (Node 18+ / 20+ / 23+):

```bash
cd prototype
npm install
npm run dev
```

Mở trình duyệt truy cập: **`http://localhost:3000`**

---

## 3. Bản Đồ Điều Hướng (Sitemap & Routes)

### 3.1. Trang Công Khai (Landing Page)

- **`/`**: Trang giới thiệu với Hero Banner bầu trời xanh animated, máy bay giấy bay ngang, đám mây trôi bồng bềnh, 6 tính năng đột phá, sticky note testimonials và CTA đăng ký học.

### 3.2. Cổng Học Viên (Student Portal — Topbar Nổi)

- **`/dashboard`**: Student Dashboard — Tổng quan chuỗi Streak, bài tập cần nộp, lịch học sắp tới và biểu đồ tiến độ từ vựng.
- **`/vocabulary`**: Sổ tay từ vựng 3D — Thẻ Flashcard 3D lật mượt mà (Spacebar / click), nghe phát âm Bắc Kinh, vẽ chữ trong ô chữ Mễ (米字格) và làm mini quiz Pinyin.
- **`/listening`**: Phòng luyện nghe — AudioWavePlayer với 5 cột sóng âm nhấp nhô, chỉnh tốc độ 0.75x - 1.25x và trắc nghiệm chọn thanh điệu.
- **`/video`**: Xem video song ngữ — Video player kết hợp phụ đề song ngữ Trung - Việt đồng bộ theo thời gian thực, click câu để tua video, bookmark từ vựng.
- **`/grammar`**: Ngữ pháp trọng điểm HSK — Thẻ ngữ pháp mở rộng, mẹo nhớ nhanh sticky note và bài tập trắc nghiệm mini.
- **`/exercises`**: Split-Pane Studio — Màn hình chia đôi: đề bài & audio bên trái, trang vở kẻ ngang làm bài bên phải, nộp bài dập con dấu son `100分 太棒了!` và bắn pháo hoa.

### 3.3. Hub Giáo Viên (Teacher Hub — Sidebar 240px)

- **`/overview`**: Dashboard giáo viên — Thống kê học viên, lịch dạy trong tuần, danh sách bài tập chờ chấm.
- **`/classes`**: Quản lý lớp học — Danh sách lớp, phòng học, sĩ số, modal tạo lớp mới và xem danh sách học viên.
- **`/students`**: Học viên & Sổ điểm — Bảng học viên có tìm kiếm, lọc theo trình độ HSK, sắp xếp theo điểm và trạng thái nộp bài.
- **`/attendance`**: Điểm danh 1-chạm — Chạm để chuyển trạng thái `Có mặt ✔ ➔ Đi muộn ⏱ ➔ Vắng mặt ✖`, nút điểm danh tất cả và lưu điểm danh có hiệu ứng chúc mừng.

---

## 4. Theme Engine (6 Bộ Wallpaper)

Bấm vào nút **Palette** ở góc phải thanh điều hướng hoặc Sidebar để đổi giữa 6 bộ chủ đề:

1. **Bầu Trời Xanh (Sky Blue - Default)**: Tươi sáng, năng động, chân trời hy vọng.
2. **Anh Đào Mùa Xuân (Sakura)**: Hồng pastel dịu dàng, ấm cúng.
3. **Thanh Trúc & Vườn Trà (Bamboo)**: Xanh lá zen thiền tịnh, thư giãn mắt.
4. **Cổ Phong Thư Pháp (Oriental)**: Tranh thủy mặc, giấy xuyến cổ điển.
5. **Vườn Hoa Nắng Xuân (Spring Garden)**: Màu nước rực rỡ buổi sớm mai.
6. **HapoStudio Creative (Hapo)**: Bo tròn tuyệt đối chuẩn HapoStudio.

Chế độ **Dark Mode**: Bấm nút Mặt Trăng / Mặt Trời để kích hoạt nền tối kính mờ chống chói mắt khi học ban đêm.

---

## 5. Tiêu Chuẩn Trợ Năng & Thẩm Mỹ (WCAG 2.2 AA)

- Độ tương phản chữ luôn đạt chuẩn tối thiểu 4.5:1.
- Vòng viền Focus Ring 3px nổi bật khi điều hướng bằng bàn phím (Tab).
- Hỗ trợ phím Spacebar để lật thẻ từ vựng và tạm dừng audio.
- Hỗ trợ chế độ giảm chuyển động (`prefers-reduced-motion`).
