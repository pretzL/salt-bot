const fs = require("node:fs");
const path = require("node:path");
const { REST, Routes } = require("discord.js");
const { loadConfig } = require("./config");

async function main() {
  const config = loadConfig();

  const commands = [];
  const commandsPath = path.join(__dirname, "commands");

  for (const file of fs.readdirSync(commandsPath).filter((name) => name.endsWith(".js"))) {
    const command = require(path.join(commandsPath, file));

    if (!command.data || typeof command.data.toJSON !== "function") {
      throw new Error(`commands/${file} must export a SlashCommandBuilder as "data"`);
    }

    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: "10" }).setToken(config.token);
  const route = config.guildId
    ? Routes.applicationGuildCommands(config.clientId, config.guildId)
    : Routes.applicationCommands(config.clientId);
  const scope = config.guildId ? `in guild ${config.guildId}` : "globally";

  console.log(`Registering ${commands.length} command(s) ${scope}...`);
  const data = await rest.put(route, { body: commands });
  console.log(`Registered ${data.length} command(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
