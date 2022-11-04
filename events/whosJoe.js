const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  once: true,
  execute(msg) {
    const regEx = /^Who(?:'s joe\??|s joe\??)$/;
    const patternMatches = regEx.test(msg.content);
    if (patternMatches) {
      msg.reply(`JOE MAMA LMAOOOOO`);
    }
  },
};
