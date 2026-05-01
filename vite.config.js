import { defineConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import react from '@vitejs/plugin-react'

const projectRoot = process.cwd()

function buildHtmlInputs() {
  const files = fs
    .readdirSync(projectRoot)
    .filter((f) => f.endsWith('.html'))

  const inputs = {}
  for (const file of files) {
    if (file === 'sympathetic_technology_hero_v3_1.html') continue
    if (file.startsWith('legacy-')) continue
    if (file === 'about.html') continue
    const name = path.basename(file, '.html')
    inputs[name] = path.resolve(projectRoot, file)
  }
  return inputs
}

export default defineConfig({
  plugins: [react()],
  /** Single-page app: client /about is React Router, not a second HTML entry. */
  appType: 'spa',
  base: './',
  /** Avoid stale JS/CSS in the browser while developing (SPA is easy to cache by mistake). */
  server: {
    port: 5174,
    headers: {
      'Cache-Control': 'no-store',
    },
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: buildHtmlInputs(),
    },
  },
})
