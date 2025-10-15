
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0B",
        fg: "#E5E7EB",
        accent: { DEFAULT: "#7C3AED", soft: "#2B1B4B" }
      },
      fontFamily: {
        sans: ["ui-sans-serif","system-ui","-apple-system","Segoe UI","Roboto","Ubuntu","Cantarell","Noto Sans","Helvetica Neue","Arial","sans-serif"]
      }
    },
  },
  plugins: [],
};
