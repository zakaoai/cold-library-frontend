// vite.config.ts
import react from "file:///C:/Users/Zakaoai/GitProject/cold-library-frontend/.yarn/__virtual__/@vitejs-plugin-react-virtual-d68821a6a3/3/AppData/Local/Yarn/Berry/cache/@vitejs-plugin-react-npm-4.2.1-8b9705c544-10c0.zip/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import { defineConfig } from "file:///C:/Users/Zakaoai/GitProject/cold-library-frontend/.yarn/__virtual__/vite-virtual-5247a7db4b/3/AppData/Local/Yarn/Berry/cache/vite-npm-5.2.8-618ece674d-10c0.zip/node_modules/vite/dist/node/index.js";
import eslint from "file:///C:/Users/Zakaoai/GitProject/cold-library-frontend/.yarn/__virtual__/@nabla-vite-plugin-eslint-virtual-fa7362ec6f/3/AppData/Local/Yarn/Berry/cache/@nabla-vite-plugin-eslint-npm-2.0.2-5a2dbd06b1-10c0.zip/node_modules/@nabla/vite-plugin-eslint/src/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\Zakaoai\\GitProject\\cold-library-frontend";
var vite_config_default = defineConfig((env) => ({
  plugins: [react(), eslint()],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version)
  },
  build: {
    target: "esnext"
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__vite_injected_original_dirname, "src") }]
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
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxaYWthb2FpXFxcXEdpdFByb2plY3RcXFxcY29sZC1saWJyYXJ5LWZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxaYWthb2FpXFxcXEdpdFByb2plY3RcXFxcY29sZC1saWJyYXJ5LWZyb250ZW5kXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9aYWthb2FpL0dpdFByb2plY3QvY29sZC1saWJyYXJ5LWZyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCJcbi8vIGltcG9ydCBlc2xpbnQgZnJvbSBcInZpdGUtcGx1Z2luLWVzbGludDJcIlxuLy8gaW1wb3J0IGVzbGludCBmcm9tIFwidml0ZS1wbHVnaW4tZXNsaW50XCJcbmltcG9ydCBlc2xpbnQgZnJvbSBcIkBuYWJsYS92aXRlLXBsdWdpbi1lc2xpbnRcIlxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKGVudiA9PiAoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSwgZXNsaW50KCldLFxuICBkZWZpbmU6IHtcbiAgICBBUFBfVkVSU0lPTjogSlNPTi5zdHJpbmdpZnkocHJvY2Vzcy5lbnYubnBtX3BhY2thZ2VfdmVyc2lvbilcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICB0YXJnZXQ6IFwiZXNuZXh0XCJcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiBbeyBmaW5kOiBcIkBcIiwgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjXCIpIH1dXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGVzYnVpbGRPcHRpb25zOiB7XG4gICAgICBqc3g6IFwiYXV0b21hdGljXCJcbiAgICB9XG4gIH0sXG4gIHRlc3Q6IHtcbiAgICBnbG9iYWxzOiB0cnVlLFxuICAgIGVudmlyb25tZW50OiBcImhhcHB5LWRvbVwiLFxuICAgIHNldHVwRmlsZXM6IFtcIi4vc3JjL3NldHVwVGVzdHMudHNcIl0sXG4gICAgY292ZXJhZ2U6IHtcbiAgICAgIHByb3ZpZGVyOiBcInY4XCIsXG4gICAgICByZXBvcnRlcjogW1wibGNvdlwiLCBcImpzb25cIiwgXCJodG1sXCJdXG4gICAgfSxcbiAgICBpbmNsdWRlOiBbXCJzcmMvKiovKi57dGVzdCxzcGVjfS57anMsbWpzLGNqcyx0cyxtdHMsY3RzLGpzeCx0c3h9XCJdXG4gIH1cbn0pKVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFFakIsU0FBUyxvQkFBb0I7QUFHN0IsT0FBTyxZQUFZO0FBUG5CLElBQU0sbUNBQW1DO0FBVXpDLElBQU8sc0JBQVEsYUFBYSxVQUFRO0FBQUEsRUFDbEMsU0FBUyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFBQSxFQUMzQixRQUFRO0FBQUEsSUFDTixhQUFhLEtBQUssVUFBVSxRQUFRLElBQUksbUJBQW1CO0FBQUEsRUFDN0Q7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPLENBQUMsRUFBRSxNQUFNLEtBQUssYUFBYSxLQUFLLFFBQVEsa0NBQVcsS0FBSyxFQUFFLENBQUM7QUFBQSxFQUNwRTtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osZ0JBQWdCO0FBQUEsTUFDZCxLQUFLO0FBQUEsSUFDUDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLFlBQVksQ0FBQyxxQkFBcUI7QUFBQSxJQUNsQyxVQUFVO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixVQUFVLENBQUMsUUFBUSxRQUFRLE1BQU07QUFBQSxJQUNuQztBQUFBLElBQ0EsU0FBUyxDQUFDLHNEQUFzRDtBQUFBLEVBQ2xFO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
