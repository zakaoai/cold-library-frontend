/// <reference types="vitest" />
import react from "@vitejs/plugin-react"
import path from "path"

import { defineConfig } from "vite"
import eslint from "vite-plugin-eslint"

// https://vitejs.dev/config/
export default defineConfig(env => ({
  plugins: [react(), env.mode !== "test" && eslint()],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version)
  },
  build: {
    target: "esnext"
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }]
  },
  optimizeDeps: {
    esbuildOptions: {
      jsx: "automatic"
    }
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./src/setupTests.ts"],
    coverage: {
      provider: "v8",
      reporter: ["lcov", "json", "html"]
    },
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"]
  }
}))
