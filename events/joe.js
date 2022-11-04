const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  once: true,
  execute(msg) {
    const triggerWords = ["joe", "Joe"];
    triggerWords.forEach((word) => {
      if (msg.content.startsWith(word)) {
        msg.reply(`Who's joe?`);
      }
    });
  },
};
