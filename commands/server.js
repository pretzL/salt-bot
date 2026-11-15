const { SlashCommandBuilder, InteractionContextType, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Display info about this server.")
    .setContexts(InteractionContextType.Guild),
  async execute(interaction) {
    const { guild } = interaction;

    if (!guild) {
      return interaction.reply({
        content: "This command only works in a server.",
        flags: MessageFlags.Ephemeral,
      });
    }

    return interaction.reply(`Server name: ${guild.name}\nTotal members: ${guild.memberCount}`);
  },
};
