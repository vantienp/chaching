export interface Student {
  id: string;
  name: string;
  avatarColor: string;
  chineseName: string;
  class: string;
  streak: number;
  level: "HSK1" | "HSK2" | "HSK3";
  attendance: "present" | "absent" | "late";
  score: number;
  phone: string;
  lastActive: string;
  homeworkStatus: "submitted" | "pending" | "graded";
}

export const STUDENTS_LIST: Student[] = [
  {
    id: "stu-1",
    name: "Nguyễn Minh Anh",
    chineseName: "阮明英",
    avatarColor: "bg-sky-500",
    class: "Lớp HSK 2 - Buổi tối (T2-T4-T6)",
    streak: 15,
    level: "HSK2",
    attendance: "present",
    score: 96,
    phone: "0912 345 678",
    lastActive: "10 phút trước",
    homeworkStatus: "graded",
  },
  {
    id: "stu-2",
    name: "Trần Tuấn Kiệt",
    chineseName: "陈俊杰",
    avatarColor: "bg-emerald-500",
    class: "Lớp HSK 2 - Buổi tối (T2-T4-T6)",
    streak: 22,
    level: "HSK2",
    attendance: "present",
    score: 92,
    phone: "0988 765 432",
    lastActive: "30 phút trước",
    homeworkStatus: "submitted",
  },
  {
    id: "stu-3",
    name: "Lê Phương Thảo",
    chineseName: "黎芳草",
    avatarColor: "bg-pink-500",
    class: "Lớp HSK 2 - Buổi tối (T2-T4-T6)",
    streak: 8,
    level: "HSK2",
    attendance: "late",
    score: 85,
    phone: "0934 112 233",
    lastActive: "Hôm qua",
    homeworkStatus: "submitted",
  },
  {
    id: "stu-4",
    name: "Phạm Gia Huy",
    chineseName: "范嘉辉",
    avatarColor: "bg-amber-500",
    class: "Lớp HSK 1 - Cấp tốc Cuối tuần",
    streak: 3,
    level: "HSK1",
    attendance: "absent",
    score: 78,
    phone: "0905 556 778",
    lastActive: "2 ngày trước",
    homeworkStatus: "pending",
  },
  {
    id: "stu-5",
    name: "Hoàng Bảo Ngọc",
    chineseName: "黄宝玉",
    avatarColor: "bg-purple-500",
    class: "Lớp HSK 1 - Cấp tốc Cuối tuần",
    streak: 30,
    level: "HSK1",
    attendance: "present",
    score: 100,
    phone: "0977 443 322",
    lastActive: "Vừa xong",
    homeworkStatus: "graded",
  },
  {
    id: "stu-6",
    name: "Đỗ Quốc Khánh",
    chineseName: "杜国庆",
    avatarColor: "bg-indigo-500",
    class: "Lớp HSK 3 - Đàm thoại nâng cao",
    streak: 18,
    level: "HSK3",
    attendance: "present",
    score: 88,
    phone: "0944 889 900",
    lastActive: "1 giờ trước",
    homeworkStatus: "pending",
  },
];
