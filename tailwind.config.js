/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          900: "#07090f",
          800: "#0b0f19",
          700: "#101826",
          600: "#141e2f",
        },
        accent: {
          300: "#63f5d6",
          400: "#36e6c5",
          500: "#18caa8",
        },
        neon: {
          400: "#43d8ff",
          500: "#2bbcff",
          600: "#0aa0ff",
        },
      },
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(43, 188, 255, 0.35)",
        glowStrong: "0 0 40px rgba(99, 245, 214, 0.35)",
        soft: "0 18px 50px rgba(2, 8, 23, 0.55)",
      },
      backgroundImage: {
        "grid-fade": "radial-gradient(circle at 1px 1px, rgba(99, 245, 214, 0.12) 1px, transparent 0)",
        "hero-glow": "radial-gradient(circle at top, rgba(43, 188, 255, 0.28), rgba(7, 9, 15, 0) 55%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
}
