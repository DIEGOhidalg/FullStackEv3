import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config with React plugin and proxy to backend
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
