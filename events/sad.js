const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  once: false,
  execute(msg) {
    const triggerWords = ["In your face bot"];
    triggerWords.forEach((word) => {
      const message = msg.content.toLowerCase();
      if (message.includes(word)) {
        msg.reply(`:feelsbadman:`);
      }
    });
  },
};
