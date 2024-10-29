import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tscongPaths from 'vite-tsconfig-paths';

import commonjs from 'vite-plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
  root: '.',
  plugins: [
    react({
      include: '**/*.tsx'
    }),
    tscongPaths(),
    commonjs()
  ],
  resolve: {
    alias: {
      src: '/src'
    }
  },
  build: {
    outDir: './build'
  },
  server: {
    port: 3000
  }
});





