const { Events } = require("discord.js");

const TRIGGER_WORDS = ["in your face bot", "stupid bot", "fuck you bot"];

module.exports = {
  name: Events.MessageCreate,
  once: false,
  execute(msg) {
    if (msg.author.bot) return;

    const message = msg.content.toLowerCase();
    if (!TRIGGER_WORDS.some((word) => message.includes(word))) return;

    return msg.reply("<:feelsbadman:406403628056838145>");
  },
};
