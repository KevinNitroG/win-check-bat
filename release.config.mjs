/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: ["main"],
  plugins: [
    [
      // Those are 4 libs included by default. No need to install manually
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator",
      "@semantic-release/npm",
      "@semantic-release/github",
    ],
  ],
  preset: "conventionalcommits",
  changelogFile: "docs/CHANGELOG.md", // for @semantic-release/changelog but it's complex due to commit again
};
