export interface ClassInfo {
  id: string;
  name: string;
  chineseName: string;
  schedule: string;
  time: string;
  studentCount: number;
  maxStudents: number;
  teacher: string;
  room: string;
  status: "active" | "upcoming" | "completed";
  progressPercentage: number;
  startDate: string;
}

export const CLASSES_LIST: ClassInfo[] = [
  {
    id: "cls-1",
    name: "Lớp HSK 2 - Buổi tối (T2-T4-T6)",
    chineseName: "HSK 2 晚间标准班",
    schedule: "Thứ 2, 4, 6",
    time: "18:30 - 20:30",
    studentCount: 16,
    maxStudents: 18,
    teacher: "Cô Vương Linh (王玲)",
    room: "Phòng Trực Tuyến 102",
    status: "active",
    progressPercentage: 65,
    startDate: "15/09/2026",
  },
  {
    id: "cls-2",
    name: "Lớp HSK 1 - Cấp tốc Cuối tuần (T7-CN)",
    chineseName: "HSK 1 周末速成班",
    schedule: "Thứ 7 & Chủ Nhật",
    time: "09:00 - 11:30",
    studentCount: 14,
    maxStudents: 15,
    teacher: "Thầy Trương Cường (张强)",
    room: "Phòng Trực Tuyến 201",
    status: "active",
    progressPercentage: 40,
    startDate: "01/10/2026",
  },
  {
    id: "cls-3",
    name: "Lớp HSK 3 - Luyện đề & Đàm thoại chuyên sâu",
    chineseName: "HSK 3 真题强化班",
    schedule: "Thứ 3, 5, 7",
    time: "19:00 - 21:00",
    studentCount: 12,
    maxStudents: 15,
    teacher: "Cô Vương Linh (王玲)",
    room: "Phòng Trực Tuyến 303",
    status: "active",
    progressPercentage: 80,
    startDate: "10/08/2026",
  },
  {
    id: "cls-4",
    name: "Lớp Thiếu Nhi Mimi Kids - Nhập môn Chữ Hán",
    chineseName: "米米少儿汉语启蒙班",
    schedule: "Thứ 7",
    time: "14:00 - 16:00",
    studentCount: 8,
    maxStudents: 10,
    teacher: "Cô Trần Mộng Nghi (陈梦怡)",
    room: "Phòng Mimi Interactive Lab",
    status: "upcoming",
    progressPercentage: 0,
    startDate: "20/10/2026",
  },
];
