import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    origin: 'https://workouttracker.publicvm.com',
    hmr: {
      protocol: 'wss',
      host: 'workouttracker.publicvm.com',
    },
    proxy: {
      '/records': {
        target: 'https://workouttracker.publicvm.com', // Flask backend URL
        changeOrigin: true,
      },
    },
  },
})
