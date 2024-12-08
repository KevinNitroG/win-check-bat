import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["{bin,src}/**/*.{js,mjs,cjs,ts}"],
    ignores: ["dist/**/*"],
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  // {
  //   rules: {
  //     'no-empty': 'off',
  //   },
  // },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
