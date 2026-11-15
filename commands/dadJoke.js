const { SlashCommandBuilder, MessageFlags } = require("discord.js");

const API_URL = "https://icanhazdadjoke.com/";
const TIMEOUT_MS = 5000;

async function fetchRandomJoke() {
  const response = await fetch(API_URL, {
    headers: {
      Accept: "application/json",
      "User-Agent": "salt-bot (https://github.com/pretzL/salt-bot)",
    },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Dad joke API responded with ${response.status}`);
  }

  const { joke } = await response.json();
  if (!joke) {
    throw new Error("Dad joke API returned no joke");
  }

  return joke;
}

module.exports = {
  data: new SlashCommandBuilder().setName("joke").setDescription("A funny joke"),
  async execute(interaction) {
    try {
      const joke = await fetchRandomJoke();
      return await interaction.reply(joke);
    } catch (error) {
      console.error("Failed to fetch a dad joke:", error);
      return interaction.reply({
        content: "Couldn't reach the joke API. Try again in a moment.",
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
