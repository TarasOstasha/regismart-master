import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        "plate-navy": "rgb(var(--plate-navy) / <alpha-value>)",
        "plate-blue": "rgb(var(--plate-blue) / <alpha-value>)",
        "plate-sky": "rgb(var(--plate-sky) / <alpha-value>)",
        "plate-white": "rgb(var(--plate-white) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "plate-gradient":
          "linear-gradient(180deg, #4A9BD5 0%, #F0F4F8 100%)",
        "plate-gradient-h":
          "linear-gradient(90deg, #1F307C 0%, #4A9BD5 50%, #9DC8E6 100%)",
        "plate-soft":
          "linear-gradient(180deg, rgba(31,48,124,0.06) 0%, rgba(157,200,230,0.18) 50%, rgba(240,244,248,0) 100%)",
      },
      boxShadow: {
        plate:
          "0 1px 0 rgba(255,255,255,0.6) inset, 0 -1px 0 rgba(31,48,124,0.18) inset, 0 18px 40px -18px rgba(31,48,124,0.35)",
        soft: "0 1px 2px rgba(31,48,124,0.06), 0 8px 24px -12px rgba(31,48,124,0.18)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "blob-drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(3%,-2%,0) scale(1.06)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        "blob-drift": "blob-drift 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
