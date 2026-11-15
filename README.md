# salt-bot

Personal Discord bot. Node 24, discord.js v14, no database — behaviour lives in
`commands/` and `events/`.

## Requirements

- Node.js 24 (see `.nvmrc`)
- A Discord application with a bot user

## Setup

1. `npm install`
2. `cp .env.example .env` and fill in `DISCORD_TOKEN` and `DISCORD_CLIENT_ID`
3. In the Discord developer portal, open **Bot** and enable:
   - **Message Content Intent** (required by the message handlers)
   - **Server Members Intent** (required by the `GuildMembers` intent)
4. Invite the bot with the `bot` and `applications.commands` scopes
5. `npm run deploy-commands`
6. `npm run dev`

`DISCORD_GUILD_ID` is optional. Set it while developing: guild commands update
instantly, global commands can take up to an hour to appear.

## Scripts

| Script | What it does |
| --- | --- |
| `npm start` | Run the bot (used in production) |
| `npm run dev` | Run with `--watch` and load `.env` if present |
| `npm run deploy-commands` | Register slash commands |
| `npm test` | Run the `node:test` suites |
| `npm run lint:commit` | Check the last commit message |
| `npm run lint:commits` | Check commits since `origin/main` |

## Deploying to Railway

1. Create a project, then **Deploy from GitHub repo** and select this repo.
2. Add service variables: `DISCORD_TOKEN`, `DISCORD_CLIENT_ID`, and optionally
   `DISCORD_GUILD_ID`.
3. Leave the start command as the default (`npm start`). Railpack detects Node,
   runs `npm ci` on build, and starts the process.
4. **Run exactly one replica.** Two containers means two gateway sessions and
   every reply gets posted twice.
5. No public domain, port, or health check is needed — the bot connects
   outbound to Discord.
6. Register slash commands once from your machine:

   ```bash
   railway run npm run deploy-commands
   ```

Do not add `railway.json` / `railway.toml`: Railway's Config as Code is
deprecated and stops being read on 2026-12-01. If you want project config in
git later, use `railway config init` to create `.railway/railway.ts`.

## Project layout

```
index.js             entry point: loads commands and events, logs in, shuts down cleanly
config.js            environment variable loading and validation
deploy-commands.js   slash command registration
commands/            one slash command per file (data + execute)
events/              one event handler per file (name + execute)
test/                node:test suites run by CI
```

### Adding a command

Create `commands/myCommand.js` exporting `data` (a `SlashCommandBuilder`) and an
async `execute(interaction)`, then run `npm run deploy-commands`. The loader fails
fast if `data` or `execute` is missing, or if the command name is duplicated.

### Adding an event

Create `events/myEvent.js` exporting `name` (use `Events.*`, not a raw string),
`execute(...)`, and `once` if it should fire a single time. `npm test` verifies
that every handler listens to a real Discord event.

## Contributing

Commit messages and PR titles follow [Conventional Commits](https://www.conventionalcommits.org/).
See [CONTRIBUTING.md](./CONTRIBUTING.md) for the types and scopes in use.
