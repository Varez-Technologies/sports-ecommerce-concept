import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Proxy API calls to the Express backend so the frontend can use
    // same-origin /api/... URLs in development.
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
