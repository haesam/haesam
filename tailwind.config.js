/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Pretendard Variable"', 'Pretendard', '-apple-system', 'sans-serif'],
      },
      colors: {
        forest: "#1B4332",
        sage: "#2D6A4F",
        amber: "#F59E0B",
        cream: "#FAF7F2",
        ink: "#1C1917",
        stone: "#78716C",
        sand: "#E7E0D5",
      },
      maxWidth: {
        page: "1080px",
        prose: "720px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,.06)",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
