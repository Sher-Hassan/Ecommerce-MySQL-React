import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'unsafe-none'
    },
    strictPort: true,
    port: 5173,
    hmr: {
      clientPort: 5173,
    }
  }
})
