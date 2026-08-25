import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset URLs so the build works from a project-page subpath on
  // GitHub Pages as well as from the domain root.
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Stable filenames rather than content hashes. On GitHub Pages a
        // browser or CDN edge can still hold the previous index.html after a
        // deploy; with hashed names it then requests a file the new
        // deployment no longer has, the 404 stops the app mounting, and the
        // page goes white. Fixed names always resolve to something that
        // exists, and ETag revalidation keeps them fresh.
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
})
