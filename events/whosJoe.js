const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  once: false,
  execute(msg) {
    if (msg.author.bot === false) {
      const regEx = /^Who(?:'s joe\??|s joe\??)$/;
      const patternMatches = regEx.test(msg.content);
      if (patternMatches) {
        msg.reply(`JOE MAMA LMAOOOOO`);
      }
    }
  },
};
