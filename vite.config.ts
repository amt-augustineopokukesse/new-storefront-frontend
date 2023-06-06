import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    open: false,
  },
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
})
