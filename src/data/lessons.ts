export interface Lesson {
  id: string;
  title: string;
  hanziTitle: string;
  level: "HSK1" | "HSK2" | "HSK3";
  duration: string;
  completed: boolean;
  progress: number;
  description: string;
  category: "Giao tiếp" | "Ngữ pháp" | "Luyện thi" | "Văn hóa";
  badge: string;
  dueToday?: boolean;
}

export const LESSONS_LIST: Lesson[] = [
  {
    id: "lesson-1",
    title: "Bài 1: Chào hỏi & Tự giới thiệu bản thân",
    hanziTitle: "问候与自我介绍",
    level: "HSK1",
    duration: "45 phút",
    completed: true,
    progress: 100,
    description: "Làm quen với thanh điệu tiếng Trung, cách xưng hô lịch sự và giới thiệu tên tuổi, quốc tịch.",
    category: "Giao tiếp",
    badge: "Đã hoàn thành",
  },
  {
    id: "lesson-2",
    title: "Bài 2: Gọi món & Đi chợ mua sắm",
    hanziTitle: "点餐与购物",
    level: "HSK1",
    duration: "50 phút",
    completed: false,
    progress: 65,
    description: "Học các lượng từ thường gặp (个, 份, 杯), hỏi giá tiền (多少钱) và cách gọi món ăn truyền thống.",
    category: "Giao tiếp",
    badge: "Đang học",
    dueToday: true,
  },
  {
    id: "lesson-3",
    title: "Bài 3: Chỉ đường & Phương tiện giao thông",
    hanziTitle: "问路与交通工具",
    level: "HSK1",
    duration: "40 phút",
    completed: false,
    progress: 20,
    description: "Học cách hỏi vị trí, phương hướng (左, 右, 前, 后) và cách bắt xe taxi, tàu điện ngầm.",
    category: "Giao tiếp",
    badge: "Kế tiếp",
  },
  {
    id: "lesson-4",
    title: "Bài 4: Khám phá Cổ trấn & Trà Đạo Trung Hoa",
    hanziTitle: "中国茶文化与古镇",
    level: "HSK2",
    duration: "60 phút",
    completed: false,
    progress: 0,
    description: "Tìm hiểu văn hóa thưởng trà Long Tỉnh, Ô Long và lịch sử các phố cổ Tô Châu, Hàng Châu.",
    category: "Văn hóa",
    badge: "Chưa mở",
  },
];
