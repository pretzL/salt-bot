const { Events } = require("discord.js");

const PATTERN = /^who(?:'s|s)\s+joe\b/i;

module.exports = {
  name: Events.MessageCreate,
  once: false,
  execute(msg) {
    if (msg.author.bot) return;
    if (!PATTERN.test(msg.content)) return;

    return msg.reply("JOE MAMA LMAOOOOO");
  },
};
