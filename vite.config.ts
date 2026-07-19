import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 상대 경로 빌드 — GitHub Pages(/haesam/ 서브경로)와 루트 도메인 배포 모두 지원
  base: './',
})
