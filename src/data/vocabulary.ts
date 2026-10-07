export interface VocabularyWord {
  id: string;
  hanzi: string;
  pinyin: string;
  meaning_vi: string;
  meaning_hv: string; // Hán Việt
  level: "HSK1" | "HSK2" | "HSK3";
  strokeCount: number;
  radical: string;
  radicalMeaning: string;
  examples: {
    cn: string;
    pinyin: string;
    vi: string;
  }[];
  audioSpeedUrls?: {
    normal: string;
    slow: string;
  };
}

export const VOCABULARY_LIST: VocabularyWord[] = [
  {
    id: "vocab-1",
    hanzi: "你好",
    pinyin: "nǐ hǎo",
    meaning_vi: "Xin chào",
    meaning_hv: "Nhĩ hảo",
    level: "HSK1",
    strokeCount: 13,
    radical: "亻",
    radicalMeaning: "Bộ Nhân đứng (người)",
    examples: [
      {
        cn: "老师，你好！",
        pinyin: "Lǎoshī, nǐ hǎo!",
        vi: "Em chào thầy/cô ạ!",
      },
      {
        cn: "你好，很高兴认识你。",
        pinyin: "Nǐ hǎo, hěn gāoxìng rènshí nǐ.",
        vi: "Chào bạn, rất vui được làm quen với bạn.",
      },
    ],
  },
  {
    id: "vocab-2",
    hanzi: "谢谢",
    pinyin: "xièxie",
    meaning_vi: "Cảm ơn",
    meaning_hv: "Tạ tạ",
    level: "HSK1",
    strokeCount: 12,
    radical: "讠",
    radicalMeaning: "Bộ Ngôn (lời nói)",
    examples: [
      {
        cn: "谢谢你的帮助！",
        pinyin: "Xièxie nǐ de bāngzhù!",
        vi: "Cảm ơn sự giúp đỡ của bạn!",
      },
      {
        cn: "不客气，不用谢。",
        pinyin: "Bù kèqì, bùyòng xiè.",
        vi: "Không có chi, đừng khách sáo.",
      },
    ],
  },
  {
    id: "vocab-3",
    hanzi: "喝茶",
    pinyin: "hē chá",
    meaning_vi: "Uống trà",
    meaning_hv: "Hát trà",
    level: "HSK1",
    strokeCount: 21,
    radical: "口 / 艹",
    radicalMeaning: "Bộ Khẩu (miệng) / Thảo (cỏ cây)",
    examples: [
      {
        cn: "你喜欢喝中国茶吗？",
        pinyin: "Nǐ xǐhuan hē Zhōngguó chá ma?",
        vi: "Bạn có thích uống trà Trung Quốc không?",
      },
      {
        cn: "请坐，我们一起喝茶聊天吧。",
        pinyin: "Qǐng zuò, wǒmen yìqǐ hē chá liáotiān ba.",
        vi: "Mời ngồi, chúng ta cùng uống trà trò chuyện nhé.",
      },
    ],
  },
  {
    id: "vocab-4",
    hanzi: "学习",
    pinyin: "xuéxí",
    meaning_vi: "Học tập, rèn luyện",
    meaning_hv: "Học tập",
    level: "HSK1",
    strokeCount: 11,
    radical: "子 / 习",
    radicalMeaning: "Bộ Tử (con cái) / Tập (luyện tập)",
    examples: [
      {
        cn: "我每天在米米汉语学习中文。",
        pinyin: "Wǒ měitiān zài Mǐmǐ Hànyǔ xuéxí Zhōngwén.",
        vi: "Tôi học tiếng Trung mỗi ngày tại Cha Ching (Mimi Hanyu).",
      },
      {
        cn: "学习汉语很有意思！",
        pinyin: "Xuéxí Hànyǔ hěn yǒu yìsi!",
        vi: "Học tiếng Hán rất thú vị!",
      },
    ],
  },
  {
    id: "vocab-5",
    hanzi: "朋友",
    pinyin: "péngyou",
    meaning_vi: "Bạn bè, người bạn",
    meaning_hv: "Bằng hữu",
    level: "HSK1",
    strokeCount: 8,
    radical: "月",
    radicalMeaning: "Bộ Nguyệt (mặt trăng/thịt)",
    examples: [
      {
        cn: "他是我的好朋友。",
        pinyin: "Tā shì wǒ de hǎo péngyou.",
        vi: "Cậu ấy là bạn thân của tôi.",
      },
      {
        cn: "我们在中文班认识了新朋友。",
        pinyin: "Wǒmen zài Zhōngwén bān rènshí le xīn péngyou.",
        vi: "Chúng tôi đã quen thêm bạn mới trong lớp tiếng Trung.",
      },
    ],
  },
  {
    id: "vocab-6",
    hanzi: "准备",
    pinyin: "zhǔnbèi",
    meaning_vi: "Chuẩn bị, dự định",
    meaning_hv: "Chuẩn bị",
    level: "HSK2",
    strokeCount: 18,
    radical: "冫 / 夂",
    radicalMeaning: "Bộ Băng / Bộ Trĩ",
    examples: [
      {
        cn: "你准备好考HSK了吗？",
        pinyin: "Nǐ zhǔnbèi hǎo kǎo HSK le ma?",
        vi: "Bạn đã chuẩn bị xong cho kỳ thi HSK chưa?",
      },
    ],
  },
];
