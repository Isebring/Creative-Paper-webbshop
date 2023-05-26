import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],
    reporters: ['verbose'],
    setupFiles: ['src/tests/support/setup.ts'],
    threads: false,
  },
});
