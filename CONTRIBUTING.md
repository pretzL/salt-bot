# Contributing

## Commit messages and PR titles

This repo follows [Conventional Commits](https://www.conventionalcommits.org/).
The same format applies to **both** commit messages and pull request titles,
because PR titles become the commit message when a PR is squash-merged.

```
<type>(<scope>)!: <subject>

[optional body]

[optional footer(s)]
```

### Rules

- `type` is required and must be one of the types below.
- `scope` is optional, lowercase, and names the area of the codebase touched.
- `subject` is required, lowercase, imperative mood ("add", not "added"/"adds"),
  and has no trailing period.
- The whole header must be at most 100 characters.
- Wrap body and footer lines at 100 characters.
- Use `!` after the type/scope **and** a `BREAKING CHANGE:` footer for breaking
  changes.

### Types

| Type | Use for |
| --- | --- |
| `feat` | A new user-visible feature or command |
| `fix` | A bug fix |
| `perf` | A performance improvement |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `docs` | Documentation only |
| `style` | Formatting, whitespace, missing semicolons — no logic change |
| `test` | Adding or fixing tests |
| `build` | Build system, bundler, or packaging changes |
| `ci` | CI/CD workflow changes |
| `chore` | Maintenance, dependencies, tooling |
| `revert` | Reverting a previous commit |

### Scopes

Scopes are free-form, but prefer one of: `bot`, `commands`, `events`, `config`,
`db`, `deploy`, `ci`, `deps`.

### Examples

```
feat(commands): add /uwu command
fix(events): keep dadjoke handler registered after the first message
refactor(bot): split the gateway client from the firebase function
chore(deps): bump discord.js to 14.28.1
ci: lint PR titles and commit messages
feat(config)!: read the bot token from environment variables only

BREAKING CHANGE: config.json is no longer read; set DISCORD_TOKEN instead.
```

### Enforcement

- **Locally:** a `commit-msg` hook (Husky + commitlint) rejects non-conforming
  messages. Run `npm install` once to install the hook.
- **On GitHub:** `.github/workflows/commitlint.yml` validates the PR title and
  every commit in the PR.

Bypassing the hook with `git commit --no-verify` will still be caught in CI.

Draft PRs may use a `[WIP]` prefixed title; that exemption applies to PR titles
only, not to commit messages.

### Notes

- Commits made before this standard was adopted are not compliant and are left
  as-is; enforcement applies to new commits only.
- For PR titles to matter, the repo should use **Squash and merge** with the PR
  title as the merge commit message.
