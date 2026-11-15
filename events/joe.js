const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  once: false,
  execute(msg) {
    if (msg.author.bot) return;
    if (!/^joe\b/i.test(msg.content)) return;

    return msg.reply("Who's joe?");
  },
};
