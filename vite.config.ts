import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Remove the custom PostCSS configuration from here
  // We'll rely on the postcss.config.js file instead
})
