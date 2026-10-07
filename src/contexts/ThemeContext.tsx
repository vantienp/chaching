"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { THEMES, DEFAULT_THEME, ThemeConfig } from "@/lib/themes";

interface ThemeContextType {
  theme: ThemeConfig;
  setThemeId: (id: string) => void;
  isDark: boolean;
  toggleDark: () => void;
  availableThemes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeConfig>(DEFAULT_THEME);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const savedThemeId = localStorage.getItem("chaching_theme");
    const savedDark = localStorage.getItem("chaching_dark");

    if (savedThemeId) {
      const found = THEMES.find((t) => t.id === savedThemeId);
      if (found) setTheme(found);
    }
    if (savedDark !== null) {
      setIsDark(savedDark === "true");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.setAttribute("data-theme", theme.id);
    root.setAttribute("data-mode", isDark ? "dark" : "light");

    root.style.setProperty("--color-primary", theme.primary);
    root.style.setProperty("--color-primary-hover", theme.primaryHover);
    root.style.setProperty("--color-primary-light", theme.primaryLight);
    root.style.setProperty("--color-accent", theme.accent);
    root.style.setProperty("--color-accent-light", theme.accentLight);
    root.style.setProperty("--surface-page-bg", isDark ? "#090d16" : theme.pageBg);
    root.style.setProperty("--wallpaper-url", `url('${theme.wallpaperUrl}')`);

    localStorage.setItem("chaching_theme", theme.id);
    localStorage.setItem("chaching_dark", String(isDark));
  }, [theme, isDark, mounted]);

  const setThemeId = (id: string) => {
    const found = THEMES.find((t) => t.id === id);
    if (found) setTheme(found);
  };

  const toggleDark = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setThemeId,
        isDark,
        toggleDark,
        availableThemes: THEMES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
