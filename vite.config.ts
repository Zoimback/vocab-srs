import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  base: '/vocab-srs/',
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          fsrs: ['ts-fsrs'],
          dexie: ['dexie'],
        },
      },
    },
  },
  preview: {
    port: 4173,
  },
});
