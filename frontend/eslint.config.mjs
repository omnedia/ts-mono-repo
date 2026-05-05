// @ts-check
import eslint from '@eslint/js';
import angular from 'angular-eslint';
import prettier from 'eslint-plugin-prettier/recommended';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

const tsOnly = (configs) =>
  configs.map((c) => ({
    ...c,
    files: ['**/*.ts'],
  }));

export default tseslint.config(
  {
    ignores: [
      'node_modules/**',

      'dist/**',
      'out-tsc/**',

      'coverage/**',
      '.nyc_output/**',

      '.idea/**',
      '.vscode/**',

      '.angular/**',
      '*.log',

      '**/*.js',
      '**/*.mjs',
      '!eslint.config.mjs',
    ],
  },
  eslint.configs.recommended,
  ...tsOnly(tseslint.configs.recommended),
  ...tsOnly(tseslint.configs.stylistic),
  {
    files: ['**/*.ts'],
    plugins: {
      'unused-imports': unusedImports,
    },
    extends: [...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': 'off', // replaced by unused-imports
      '@typescript-eslint/ban-ts-comment': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
      'prefer-const': 'error',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/no-autofocus': 'off',
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/no-negated-async': 'error',
      '@angular-eslint/template/eqeqeq': 'error',
    },
  },
  prettier,
);
