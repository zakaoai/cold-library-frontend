import { defineConfig } from 'vitest/config';
import path from "path";

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        alias: {},
        setupFiles: ['./src/setupTests.ts'],
        coverage: {
            reporter: ['lcov', 'json', 'html'],
        },
        include: [
            'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        ],
    },
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
});