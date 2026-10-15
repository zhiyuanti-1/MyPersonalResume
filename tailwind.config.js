/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF7",
        ink: "#111111",
        accent: "#E4572E",
        muted: "#6B6B6B",
        rule: "#E5E2DA",
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', "serif"],
        mono: ['"JetBrains Mono"', '"Cascadia Mono"', "Consolas", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
