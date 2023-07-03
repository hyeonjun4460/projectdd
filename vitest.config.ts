import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    alias: {
      '@api': './src/api',
      '@libs': './src/libs',
      '@src': './src/*',
    },
  },
  resolve: {
    alias: { '@api': './src/api', '@libs': './src/libs', '@src': './src/*' },
  },
  plugins: [
    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: 'commonjs' },
    }),
  ],
});
