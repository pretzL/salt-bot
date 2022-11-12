const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  once: false,
  execute(msg) {
    const triggerWords = ["in your face bot", "stupid bot", "fuck you bot"];
    triggerWords.forEach((word) => {
      const message = msg.content.toLowerCase();
      if (message.includes(word)) {
        msg.reply(`<:feelsbadman:406403628056838145>`);
      }
    });
  },
};
