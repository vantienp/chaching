export interface ThemeConfig {
  id: string;
  name: string;
  hanziName: string;
  primary: string;
  primaryHover: string;
  primaryLight: string;
  accent: string;
  accentLight: string;
  pageBg: string;
  wallpaperUrl: string;
  description: string;
}

export const THEMES: ThemeConfig[] = [
  {
    id: "sky-blue",
    name: "Bầu Trời Xanh",
    hanziName: "蓝天明月",
    primary: "#0ea5e9",
    primaryHover: "#0284c7",
    primaryLight: "#e0f2fe",
    accent: "#f59e0b",
    accentLight: "#fef3c7",
    pageBg: "#f0f9ff",
    wallpaperUrl: "/theme_background/bau_troi_xanh.jpg",
    description: "Tươi sáng, chân trời rộng mở, tràn đầy năng lượng học tập",
  },
  {
    id: "sakura",
    name: "Anh Đào Mùa Xuân",
    hanziName: "樱花漫舞",
    primary: "#b75d79",
    primaryHover: "#9d4b64",
    primaryLight: "#fdf2f4",
    accent: "#e07a9a",
    accentLight: "#fce7f3",
    pageBg: "#fdf6f8",
    wallpaperUrl: "/theme_background/anh_dao_mua_xuan.jpg",
    description: "Sắc hồng hoa đào pastel dịu dàng, ngọt ngào, ấm cúng",
  },
  {
    id: "bamboo",
    name: "Thanh Trúc & Vườn Trà",
    hanziName: "竹林清幽",
    primary: "#386641",
    primaryHover: "#2d5234",
    primaryLight: "#eef5ef",
    accent: "#84a98c",
    accentLight: "#dcfce7",
    pageBg: "#f2f7f2",
    wallpaperUrl: "/theme_background/thanh_truc_vuon_tra.jpg",
    description: "Xanh lá zen tĩnh tại, dịu mắt cho các buổi luyện nghe & đọc dài",
  },
  {
    id: "oriental",
    name: "Cổ Phong Thư Pháp",
    hanziName: "水墨丹青",
    primary: "#8b4513",
    primaryHover: "#71370f",
    primaryLight: "#fbf5ee",
    accent: "#c84b31",
    accentLight: "#fee2e2",
    pageBg: "#fbf8f1",
    wallpaperUrl: "/theme_background/co_phong_thu_phap.jpg",
    description: "Tranh thủy mặc, giấy xuyến, đậm chất văn hóa Hán ngữ truyền thống",
  },
  {
    id: "spring-garden",
    name: "Vườn Hoa Nắng Xuân",
    hanziName: "春意盎然",
    primary: "#3b82f6",
    primaryHover: "#2563eb",
    primaryLight: "#eff6ff",
    accent: "#10b981",
    accentLight: "#d1fae5",
    pageBg: "#f0f9ff",
    wallpaperUrl: "/theme_background/vuon_hoa_nang_xuan.jpg",
    description: "Vườn hoa màu nước bừng sáng buổi sớm mai",
  },
];

export const DEFAULT_THEME = THEMES[0];
