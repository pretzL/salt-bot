/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  // Keep this type list in sync with `.github/workflows/commitlint.yml`.
  // @commitlint/config-conventional already defaults to exactly these types;
  // they are listed here so the standard is visible in one place.
  rules: {
    "type-enum": [
      2,
      "always",
      ["build", "chore", "ci", "docs", "feat", "fix", "perf", "refactor", "revert", "style", "test"],
    ],
    // Default is 72, which is too tight for `feat(events): ...` subjects.
    "header-max-length": [2, "always", 100],
  },
};
