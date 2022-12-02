const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  once: false,
  execute(msg) {
    const triggerWords = ["fuck yourself"];
    triggerWords.forEach((word) => {
      const message = msg.content.toLowerCase();
      if (message.includes(word)) {
        msg.reply(`Fuck me yourself, pussy`);
      }
    });
  },
};
