const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const { loadConfig } = require("./config");

let config;
try {
  config = loadConfig();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel],
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
for (const file of fs.readdirSync(commandsPath).filter((name) => name.endsWith(".js"))) {
  const command = require(path.join(commandsPath, file));

  if (!command.data || typeof command.execute !== "function") {
    throw new Error(`commands/${file} must export a "data" builder and an "execute" function`);
  }

  if (client.commands.has(command.data.name)) {
    throw new Error(`commands/${file} reuses the command name "${command.data.name}"`);
  }

  client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, "events");
for (const file of fs.readdirSync(eventsPath).filter((name) => name.endsWith(".js"))) {
  const event = require(path.join(eventsPath, file));

  if (!event.name || typeof event.execute !== "function") {
    throw new Error(`events/${file} must export a "name" and an "execute" function`);
  }

  const handler = (...args) => {
    Promise.resolve()
      .then(() => event.execute(...args))
      .catch((error) => console.error(`Error in the ${event.name} handler (events/${file}):`, error));
  };

  if (event.once) {
    client.once(event.name, handler);
  } else {
    client.on(event.name, handler);
  }
}

client.on("error", (error) => {
  console.error("Discord client error:", error);
});

client.login(config.token).catch((error) => {
  console.error("Failed to log in to Discord:", error.message);
  process.exit(1);
});

let shuttingDown = false;

async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`Received ${signal}, disconnecting.`);

  try {
    await client.destroy();
  } catch (error) {
    console.error("Error while shutting down:", error);
  }

  process.exit(0);
}

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => shutdown(signal));
}

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
});
