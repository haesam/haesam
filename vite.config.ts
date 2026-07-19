import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages는 https://haesam.github.io/haesam/ 하위 경로에 서빙됨
export default defineConfig({
  base: '/haesam/',
  plugins: [react()],
  build: {
    rollupOptions: {
      // pc.html: 모바일에서 데스크톱 레이아웃을 확인하는 미리보기 페이지
      input: {
        main: 'index.html',
        pc: 'pc.html',
      },
    },
  },
})
