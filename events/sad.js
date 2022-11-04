const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  once: false,
  execute(msg) {
    const triggerWords = ["In your face bot"];
    triggerWords.forEach((word) => {
      if (msg.content.includes(word)) {
        msg.reply(`:feelsbadman:`);
      }
    });
  },
};
