import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

// eslint-disable-next-line import/no-unresolved
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['dist', '.husky', 'build'],
  },
  {
    files: ['{bin,src}/**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.node,
      sourceType: 'module',
    },
    rules: {
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'function', next: 'function' },
        { blankLine: 'always', prev: 'function', next: 'export' },
        { blankLine: 'always', prev: 'class', next: '*' },
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'never', prev: 'directive', next: 'directive' },
      ],
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    settings: {
      // require eslint-import-resolver-typescript to resolve path
      'import/resolver': {
        typescript: {
          node: true,
          alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        },
      },
      'import/no-unresolved': [
        2,
        {
          ignore: ['typescript-eslint'],
        },
      ],
    },
  },
  pluginJs.configs.recommended,
  importPlugin.flatConfigs.recommended,
  // For no conflict with prettier and eslint
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
];
