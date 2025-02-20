import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import svgr from 'vite-plugin-svgr';
import postcss from "@tailwindcss/postcss"
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr(), postcss()
  ],
})
