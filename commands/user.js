const { SlashCommandBuilder, InteractionContextType, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user.")
    .setContexts(InteractionContextType.Guild),
  async execute(interaction) {
    if (!interaction.member) {
      return interaction.reply({
        content: "This command only works in a server.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const joinedAt = interaction.member.joinedAt;
    // Rendered as a Discord timestamp so each client shows it in local time.
    const joined = joinedAt ? `<t:${Math.floor(joinedAt.getTime() / 1000)}:D>` : "an unknown date";

    return interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${joined}.`);
  },
};
