const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits, Partials } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  autorun: true,
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Should me in /events/dadjoke.js but importing is being a bitch atm
client.on("messageCreate", (msg) => {
  if (msg.author.bot) return false;

  const triggerWords = ["I'm", "Im", "im", "i'm"];

  triggerWords.forEach((word) => {
    if (msg.content.includes(word)) {
      const trimmed = msg.content.split(" ")[1];
      const chance = Math.random();
      if (chance < 0.1) {
        msg.reply(`Hi, ${trimmed}. I'm dad!`);
      }
    }
  });
});

client.login(token);
