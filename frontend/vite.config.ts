import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative asset paths: the build works at a domain root and in a sub-folder
  // (GitHub Pages serves it from /projects-hub/).
  base: './',
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})
