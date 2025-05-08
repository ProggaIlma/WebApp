import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@UIElements': path.resolve(__dirname, 'src/UIElements'),
      '@AuthPages': path.resolve(__dirname, 'src/AuthPages'),
      '@Styles': path.resolve(__dirname, 'src/Styles'),
      '@Shared': path.resolve(__dirname, 'src/Shared'),
      '@Assets': path.resolve(__dirname, 'src/assets'),
      '@Layouts': path.resolve(__dirname, 'src/Layouts'),
      '@ModulePages': path.resolve(__dirname, 'src/ModulePages'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        format: 'es'
      }
    },
    outDir: './build'
  }
})
