import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  base: "/sumesh-portfolio/",
  plugins: [tailwindcss(), react(), babel({ presets: [reactCompilerPreset()] })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lottie-react'],
    include: ['@tsparticles/react', 'tsparticles'],
  },
  build: {
    // Produce source maps for easier debugging of the deployed build
    sourcemap: false,
    // Warn if any single chunk exceeds 600 kB
    chunkSizeWarningLimit: 600,
  },
})
