const { Events } = require("discord.js");

const TRIGGER = /^i'?m\s+(.+)/i;
const MAX_NAME_LENGTH = 100;
const REPLY_CHANCE = 0.9;

module.exports = {
  name: Events.MessageCreate,
  once: false,
  execute(msg) {
    if (msg.author.bot) return;

    const match = msg.content.match(TRIGGER);
    if (!match) return;

    if (Math.random() > REPLY_CHANCE) return;

    const name = match[1].trim().slice(0, MAX_NAME_LENGTH);
    if (!name) return;

    return msg.reply(`Hi, ${name}. I'm Dad!`);
  },
};
