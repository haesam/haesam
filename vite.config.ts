import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages는 https://haesam.github.io/haesam/ 하위 경로에 서빙됨
export default defineConfig({
  base: '/haesam/',
  plugins: [react()],
})
