// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';
import unusedImports from 'eslint-plugin-unused-imports';

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
            'build/**',
            'out/**',
            'coverage/**',
            '.nyc_output/**',
            '.idea/**',
            '.vscode/**',
            '*.log',
            '**/*.js',
            '**/*.mjs',
            '!eslint.config.mjs'
        ],
    },

    eslint.configs.recommended,
    ...tsOnly(tseslint.configs.recommended),
    ...tsOnly(tseslint.configs.stylistic),

    {
        files: ['**/*.ts'],
        languageOptions: {
            parserOptions: {
                // make rules that need type info work (optional but recommended)
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            'unused-imports': unusedImports,
        },
        rules: {
            // Nest/Node common
            'no-console': ['warn', {allow: ['warn', 'error']}],

            // TS
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': 'off', // replaced by unused-imports
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/consistent-type-imports': ['error', {prefer: 'type-imports'}],

            // Unused imports/vars
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {argsIgnorePattern: '^_', varsIgnorePattern: '^_'},
            ],

            'prefer-const': 'error',
        },
    },

    // If you have tests
    {
        files: ['**/*.spec.ts', '**/*.test.ts'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off'
        }
    },

    prettier,
);
