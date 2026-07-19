import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 아티팩트(단일 HTML) 배포용 빌드 설정
export default defineConfig({
  plugins: [react()],
  resolve: {
    // lottie_light: SVG 렌더러 전용 경량 빌드 (eval 미사용, 용량 절감)
    alias: { 'lottie-web': 'lottie-web/build/player/lottie_light' },
  },
  build: {
    outDir: 'dist-artifact',
    rollupOptions: { input: 'artifact.html' },
  },
})
