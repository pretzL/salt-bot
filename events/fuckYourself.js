const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  once: false,
  execute(msg) {
    if (msg.author.bot) return;
    if (!msg.content.toLowerCase().includes("fuck yourself")) return;

    return msg.reply("Fuck me yourself, pussy");
  },
};
