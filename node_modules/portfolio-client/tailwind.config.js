/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0E14",
        elevated: "#12161F",
        ink: "#E9E7E1",
        muted: "#9AA0AC",
        amber: "#E8A33D",
        teal: "#5FC7BE",
        rose: "#D9645F",
        border: "#232838",
      },
      fontFamily: {
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
        sans: ["'IBM Plex Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
