import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    testTimeout: 10000,
    // GUARDIAN-PROTOCOL: Temporal consistency for CI
    env: {
      TZ: 'UTC', // Force UTC timezone for deterministic snapshots
      CI: process.env.CI || 'false',
      NODE_ENV: 'test'
    },
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/tests/e2e/**' // Excluir tests de Playwright
    ],
    // Deterministic test execution
    sequence: {
      shuffle: false
    },
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: process.env.CI === 'true'
      }
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'coverage/',
        '**/*.d.ts',
        '**/*.config.{js,ts,cjs}',
        '**/main.tsx',
        '**/vite-env.d.ts',
        'scripts/**',
        'netlify/**',
        '.nvmrc',
        'tailwind.config.cjs',
        'eslint.config.js',
        'vitest.config.ts',
        'vite.config.ts'
      ],
      thresholds: {
        global: {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90
        }
      }
    }
  }
}); 