import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    alias: {
      '@api': './src/api/*',
      '@libs': './src/libs/*',
      '@src': './src/*',
    },
    root: './',
  },
  resolve: {
    alias: {
      '@api': './src/api/*',
      '@libs': './src/libs/*',
      '@src': './src/*',
    },
  },
  plugins: [swc.vite({ module: { type: 'commonjs' } })],
});
