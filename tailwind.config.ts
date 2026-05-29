import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Colours ──────────────────────────────────────────────────────────
      colors: {
        bg: {
          base:     "#070910",
          surface:  "#0d1117",
          elevated: "#111827",
        },
        accent: {
          blue:   "#4f7dff",
          violet: "#7c5cfc",
          teal:   "#00d4aa",
        },
        text: {
          primary:   "#f1f5f9",
          secondary: "#8b95a8",
          muted:     "#3d4a5c",
        },
      },

      // ── Typography ───────────────────────────────────────────────────────
      fontFamily: {
        syne:  ["var(--font-syne)", "sans-serif"],
        dm:    ["var(--font-dm-sans)", "sans-serif"],
        mono:  ["var(--font-dm-mono)", "monospace"],
      },
      fontSize: {
        "display": ["88px",  { lineHeight: "1",    letterSpacing: "-0.03em", fontWeight: "800" }],
        "h1":      ["64px",  { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "800" }],
        "h2":      ["44px",  { lineHeight: "1.1",  letterSpacing: "-0.02em", fontWeight: "800" }],
        "h3":      ["28px",  { lineHeight: "1.3",  fontWeight: "500" }],
        "body-lg": ["18px",  { lineHeight: "1.7",  fontWeight: "400" }],
        "body":    ["16px",  { lineHeight: "1.7",  fontWeight: "400" }],
        "small":   ["13px",  { lineHeight: "1.5",  fontWeight: "300" }],
        "label":   ["11px",  { lineHeight: "1",    letterSpacing: "0.2em", fontWeight: "400" }],
      },

      // ── Spacing / Layout ─────────────────────────────────────────────────
      maxWidth: {
        container: "80rem", // 1280px / 7xl
      },
      borderRadius: {
        "4xl": "2rem",
      },

      // ── Gradients ────────────────────────────────────────────────────────
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, rgba(79,125,255,0.13), rgba(124,92,252,0.13), rgba(0,212,170,0.07))",
        "gradient-cta":  "linear-gradient(135deg, #4f7dff, #7c5cfc)",
        "gradient-brand":"linear-gradient(90deg, #4f7dff, #7c5cfc, #00d4aa)",
      },

      // ── Box Shadows / Glows ──────────────────────────────────────────────
      boxShadow: {
        "glow-blue":   "0 0 60px rgba(79,125,255,0.18)",
        "glow-violet": "0 0 60px rgba(124,92,252,0.15)",
        "glow-blue-sm":"0 0 30px rgba(79,125,255,0.40)",
        "card-hover":  "0 0 40px rgba(79,125,255,0.12)",
      },

      // ── Keyframe Animations ──────────────────────────────────────────────
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "nav-enter": {
          "0%":   { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "ticker": {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "ticker-reverse": {
          "0%":   { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 30px rgba(79,125,255,0.4)" },
          "50%":       { boxShadow: "0 0 60px rgba(79,125,255,0.7)" },
        },
        "mesh-drift": {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "33%":      { transform: "translate(3%, -3%) scale(1.04)" },
          "66%":      { transform: "translate(-2%, 2%) scale(0.97)" },
        },
        "bounce-chevron": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(6px)" },
        },
      },
      animation: {
        "fade-up":        "fade-up 600ms cubic-bezier(0.4,0,0.2,1) forwards",
        "fade-in":        "fade-in 600ms cubic-bezier(0.4,0,0.2,1) forwards",
        "nav-enter":      "nav-enter 300ms cubic-bezier(0.4,0,0.2,1) forwards",
        "ticker":         "ticker 40s linear infinite",
        "ticker-reverse": "ticker-reverse 40s linear infinite",
        "pulse-glow":     "pulse-glow 2s ease-in-out infinite",
        "mesh-drift":     "mesh-drift 12s ease-in-out infinite",
        "bounce-chevron": "bounce-chevron 1.5s ease-in-out infinite",
      },

      // ── Backdrop Blur ────────────────────────────────────────────────────
      backdropBlur: {
        xl: "24px",
      },

      // ── Z-index scale ────────────────────────────────────────────────────
      zIndex: {
        "40":   "40",
        "100":  "100",
        "1000": "1000",
      },
    },
  },
  plugins: [],
};

export default config;
