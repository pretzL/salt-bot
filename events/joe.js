const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  once: false,
  execute(msg) {
    const triggerWords = ["joe", "Joe"];
    if (msg.author.bot === false) {
      triggerWords.forEach((word) => {
        if (msg.content.startsWith(word)) {
          msg.reply(`Who's joe?`);
        }
      });
    }
  },
};
