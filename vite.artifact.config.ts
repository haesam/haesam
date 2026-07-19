import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 아티팩트(단일 HTML) 배포용 빌드 설정
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-artifact',
    rollupOptions: { input: 'artifact.html' },
  },
})
