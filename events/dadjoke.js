const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  once: true,
  execute(msg) {
    const triggerWords = ["I'm ", "Im ", "im ", "i'm "];
    triggerWords.forEach((word) => {
      if (msg.content.startsWith(word)) {
        const message = msg.content.toLowerCase();
        const split = message.slice(3).trim();
        const chance = Math.random();
        if (chance > 0.1) {
          msg.reply(`Hi, ${split}. I'm Dad!`);
        }
      }
    });
  },
};
