/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['"Pretendard Variable"', 'Pretendard', 'sans-serif'],
        display: ['"Noto Serif KR"', 'serif'],
        hero: ['Inter', 'sans-serif'],
        'hero-serif': ['"Playfair Display"', 'serif'],
      },
      colors: {
        bg: "#FAF7F2",
        surface: "#FFFFFF",
        ink: "#2B2420",
        muted: "#8A7F75",
        accent: "#D96C47",
        "accent-deep": "#C05A38",
        success: "#6B8F71",
        stroke: "#EAE3D9",
        "brand-gold": "#e2b05c",
        "brand-teal": "#3ba4ab",
      },
      boxShadow: {
        card: "0 4px 24px rgba(43, 36, 32, 0.06)",
        lifted: "0 16px 48px rgba(43, 36, 32, 0.14)",
        cta: "0 8px 24px rgba(217, 108, 71, 0.35)",
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
