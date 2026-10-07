export interface GrammarPoint {
  id: string;
  title: string;
  structure: string;
  level: "HSK1" | "HSK2" | "HSK3";
  explanation: string;
  examples: {
    cn: string;
    pinyin: string;
    vi: string;
    note?: string;
  }[];
  quickTips: string;
  quizQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export const GRAMMAR_LIST: GrammarPoint[] = [
  {
    id: "g-1",
    title: "1. Câu chữ '是' (shì) — Khẳng định quan hệ tương đương",
    structure: "Chủ ngữ (S) + 是 (shì) + Tân ngữ (O)",
    level: "HSK1",
    explanation: "Được dùng để liên kết hai danh từ hoặc cụm danh từ, tương đương với động từ 'là' trong tiếng Việt. Phủ định dùng '不是' (bú shì).",
    examples: [
      {
        cn: "我是越南人。",
        pinyin: "Wǒ shì Yuènán rén.",
        vi: "Tôi là người Việt Nam.",
      },
      {
        cn: "他不是我的老师，他是我的朋友。",
        pinyin: "Tā bú shì wǒ de lǎoshī, tā shì wǒ de péngyou.",
        vi: "Anh ấy không phải là thầy giáo của tôi, anh ấy là bạn tôi.",
      },
    ],
    quickTips: "Lưu ý: '是' không đi kèm trực tiếp với tính từ (không nói: 我是好 ❌ mà nói: 我很好 ✔).",
    quizQuestion: {
      question: "Chọn câu đúng ngữ pháp tiếng Trung:",
      options: [
        "她是我的中国朋友。(Tā shì wǒ de Zhōngguó péngyou.)",
        "她是很高兴。(Tā shì hěn gāoxìng.)",
        "我不是学生很好。(Wǒ bú shì xuéshēng hěn hǎo.)",
        "他们是不来。(Tāmen shì bù lái.)",
      ],
      correctIndex: 0,
      explanation: "Câu A chuẩn xác vì '是' liên kết danh từ '我的中国朋友'.",
    },
  },
  {
    id: "g-2",
    title: "2. Cấu trúc câu chữ '把' (bǎ) — Câu xử lý tân ngữ",
    structure: "Chủ ngữ (S) + 把 (bǎ) + Tân ngữ (O) + Động từ (V) + Thành phần khác",
    level: "HSK3",
    explanation: "Dùng để nhấn mạnh sự tác động làm thay đổi vị trí, trạng thái hoặc kết quả của tân ngữ.",
    examples: [
      {
        cn: "请把作业本给我。",
        pinyin: "Qǐng bǎ zuòyè běn gěi wǒ.",
        vi: "Xin hãy đưa vở bài tập cho tôi.",
      },
      {
        cn: "我把那杯茶喝完了。",
        pinyin: "Wǒ bǎ nà bēi chá hē wán le.",
        vi: "Tôi đã uống hết cốc trà đó rồi.",
      },
    ],
    quickTips: "Tân ngữ sau '把' phải là đối tượng đã xác định (được người nói và người nghe biết rõ).",
    quizQuestion: {
      question: "Điền vào chỗ trống: 他已经___房间打扫干净了。",
      options: ["在", "被", "把", "给"],
      correctIndex: 2,
      explanation: "Dùng cấu trúc chữ 把 để chỉ hành động tác động làm phòng sạch sẽ.",
    },
  },
  {
    id: "g-3",
    title: "3. Câu hỏi với trợ từ nghi vấn '吗' (ma)",
    structure: "Câu trần thuật + 吗 (ma)?",
    level: "HSK1",
    explanation: "Đặt ở cuối câu khẳng định để biến thành câu hỏi Đúng / Sai (Yes / No).",
    examples: [
      {
        cn: "你喜欢喝奶茶吗？",
        pinyin: "Nǐ xǐhuan hē nǎichá ma?",
        vi: "Bạn có thích uống trà sữa không?",
      },
      {
        cn: "明天你去学校吗？",
        pinyin: "Míngtiān nǐ qù xuéxiào ma?",
        vi: "Ngày mai bạn có đi học không?",
      },
    ],
    quickTips: "Khi trong câu đã có đại từ nghi vấn (什么, 谁, 哪儿) thì TUYỆT ĐỐI không dùng '吗' nữa.",
    quizQuestion: {
      question: "Câu nào sau đây SAI ngữ pháp?",
      options: [
        "你喜欢学汉语吗？",
        "他是谁吗？",
        "你明天忙不忙？",
        "今天天气好吗？",
      ],
      correctIndex: 1,
      explanation: "Đã có từ nghi vấn '谁' (ai) thì không dùng thêm trợ từ '吗'.",
    },
  },
];
