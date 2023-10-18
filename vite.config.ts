import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  build: {
    target: 'esnext'
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
