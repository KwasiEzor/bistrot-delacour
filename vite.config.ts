/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(async () => {
  const plugins = [react(), tailwindcss()];
  try {
    // @ts-expect-error - File might not exist
    const m = await import('./.vite-source-tags.js');
    plugins.push(m.sourceTags());
  } catch {
    // Ignore error if file doesn't exist
  }
  return { 
    plugins,
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
    }
  };
})
