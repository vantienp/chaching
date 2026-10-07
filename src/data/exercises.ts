export interface ExerciseQuestion {
  id: string;
  type: "fill_blank" | "multiple_choice" | "tianzige_write" | "pinyin_tone";
  title: string;
  hanziPrompt: string;
  pinyinPrompt: string;
  audioPromptText?: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  hint: string;
}

export const EXERCISES_DATA: ExerciseQuestion[] = [
  {
    id: "ex-1",
    type: "multiple_choice",
    title: "Câu 1: Chọn phiên âm Pinyin đúng cho từ sau",
    hanziPrompt: "谢谢",
    pinyinPrompt: "Lựa chọn thanh điệu chuẩn:",
    options: ["xié xié", "xiè xie", "xǐ xǐ", "xī xi"],
    correctAnswer: 1,
    explanation: "Từ '谢谢' chữ đầu thanh 4 (xiè), chữ sau thanh nhẹ (xie).",
    hint: "Nhớ quy tắc thanh nhẹ ở âm tiết thứ 2 khi lặp lại động từ.",
  },
  {
    id: "ex-2",
    type: "fill_blank",
    title: "Câu 2: Điền từ thích hợp vào chỗ trống",
    hanziPrompt: "你好！我____越南人，很高兴认识你。",
    pinyinPrompt: "Nǐ hǎo! Wǒ ____ Yuènán rén, hěn gāoxìng rènshí nǐ.",
    options: ["是", "在", "有", "去"],
    correctAnswer: "是",
    explanation: "Cấu trúc S + 是 + Danh từ quốc tịch: 我是越南人 (Tôi là người Việt Nam).",
    hint: "Động từ biểu thị 'là' trong tiếng Trung.",
  },
  {
    id: "ex-3",
    type: "multiple_choice",
    title: "Câu 3: Đọc hiểu đàm thoại ngắn",
    hanziPrompt: "A: 你想喝什么？\nB: 我想喝一杯中国茶。",
    pinyinPrompt: "A: Nǐ xiǎng hē shénme? \nB: Wǒ xiǎng hē yì bēi Zhōngguó chá.",
    options: [
      "B muốn uống một cốc trà Trung Quốc.",
      "B muốn ăn cơm Trung Quốc.",
      "A mời B đi xem phim.",
      "B không muốn uống gì cả.",
    ],
    correctAnswer: 0,
    explanation: "'一杯中国茶' = một cốc trà Trung Quốc.",
    hint: "Từ khóa '喝' (uống) và '茶' (trà).",
  },
  {
    id: "ex-4",
    type: "tianzige_write",
    title: "Câu 4: Luyện viết chữ Hán trong ô chữ Mễ",
    hanziPrompt: "好",
    pinyinPrompt: "hǎo (Tốt, đẹp, hay) — Gồm bộ Nữ (女) và bộ Tử (子)",
    correctAnswer: "好",
    explanation: "Quy tắc bút thuận: Viết bộ Nữ (女) bên trái trước, bộ Tử (子) bên phải sau.",
    hint: "Bên trái là người mẹ, bên phải là đứa con -> Gia đình có cả mẹ và con là 'Tốt' (好).",
  },
];
