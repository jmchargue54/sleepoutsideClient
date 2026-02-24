import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import astro from 'eslint-plugin-astro';
import svelte from 'eslint-plugin-svelte';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default defineConfig([
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', 'old-site-backup/**'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.browser },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      'no-console': 'warn',
    },
  },
  {
    files: ['**/*.{ts,mts}'],
    languageOptions: {
      parser: tsParser,
      globals: globals.browser,
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      'no-console': 'warn',
    },
  },
  ...astro.configs.recommended,
  {
    files: ['**/*.astro'],
    rules: {
      // Add any Astro-specific rules here
    },
  },
  ...svelte.configs['flat/recommended'],
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
      },
    },
  },
]);
