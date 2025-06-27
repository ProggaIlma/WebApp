import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';


import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
   resolve: {
    alias: {
      '@Src': path.resolve(__dirname, './src'),
      '@Components': path.resolve(__dirname, './src/components'),
      '@Layouts': path.resolve(__dirname, './src/Layouts'),
      '@ModulePages': path.resolve(__dirname, './src/ModulePages'),
      '@Shared': path.resolve(__dirname, './src/shared'),
      '@Assets': path.resolve(__dirname, './src/assets'),

    },
  },
  server: {
    historyApiFallback: true, // <-- Add this for React Router
  },
})
