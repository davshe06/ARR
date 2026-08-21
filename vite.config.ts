import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset URLs so the build works from a project-page subpath on
  // GitHub Pages as well as from the domain root.
  base: './',
  plugins: [react()],
})
