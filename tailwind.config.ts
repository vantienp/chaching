import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["selector", '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
          light: "var(--color-primary-light)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          light: "var(--color-accent-light)",
        },
        surface: {
          card: "var(--surface-card)",
          "card-solid": "var(--surface-card-solid)",
          bg: "var(--surface-page-bg)",
        },
        content: {
          main: "var(--color-text-main)",
          muted: "var(--color-text-muted)",
          inverse: "var(--color-text-inverse)",
        },
        border: {
          card: "var(--border-card)",
          subtle: "var(--border-subtle)",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
        hanzi: ["'Noto Sans SC'", "sans-serif"],
        calligraphy: ["'Ma Shan Zheng'", "cursive"],
        serifHanzi: ["'Noto Serif SC'", "serif"],
      },
      borderRadius: {
        card: "24px",
        pill: "9999px",
      },
      boxShadow: {
        warm: "var(--shadow-warm-hapo)",
        glass: "inset 0 0 0 1.5px rgba(255, 255, 255, 0.8), 0 4px 16px rgba(159, 122, 104, 0.08)",
        "glass-hover": "inset 0 0 0 1.5px rgba(255, 255, 255, 0.9), 0 8px 24px rgba(159, 122, 104, 0.12)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fly-across": {
          "0%": { transform: "translate(-100px, 40px) rotate(5deg)" },
          "50%": { transform: "translate(50vw, -20px) rotate(-3deg)" },
          "100%": { transform: "translate(110vw, 30px) rotate(4deg)" },
        },
        stamp: {
          "0%": { transform: "scale(2.5) rotate(-15deg)", opacity: "0" },
          "70%": { transform: "scale(0.95) rotate(-3deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(-5deg)", opacity: "1" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fly-across": "fly-across 20s linear infinite",
        stamp: "stamp 0.4s cubic-bezier(0.17, 0.89, 0.32, 1.25) forwards",
        wiggle: "wiggle 0.3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
