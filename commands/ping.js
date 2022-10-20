const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Replies"),
  async execute(interaction) {
    return interaction.reply("Shut the fuck up");
  },
};
