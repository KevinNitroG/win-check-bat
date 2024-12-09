export default {
  '*.{js,jsx,mjs,cjs,ts,tsx}': (stagedFiles) => [
    `eslint --fix ${stagedFiles.join(' ')}`,
    `prettier --write ${stagedFiles.join(' ')}`,
  ],
  '*.{html,css,json,yml,yaml}': (stagedFiles) => [
    `prettier --write ${stagedFiles.join(' ')}`,
  ],
};
