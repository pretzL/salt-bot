const REQUIRED_KEYS = ["DISCORD_TOKEN", "DISCORD_CLIENT_ID"];

/**
 * Reads and validates bot configuration from a plain object (process.env by
 * default). Kept as a pure function so it can be tested without touching the
 * real environment.
 *
 * @param {Record<string, string | undefined>} [env]
 * @returns {{ token: string, clientId: string, guildId: string | null }}
 */
function loadConfig(env = process.env) {
  const missing = REQUIRED_KEYS.filter((key) => !env[key] || !env[key].trim());

  if (missing.length > 0) {
    const error = new Error(
      `Missing required environment variable(s): ${missing.join(", ")}. ` +
        "Copy .env.example to .env and fill it in, or set them in your host's environment.",
    );
    error.code = "ERR_MISSING_ENV";
    throw error;
  }

  return {
    token: env.DISCORD_TOKEN.trim(),
    clientId: env.DISCORD_CLIENT_ID.trim(),
    guildId: env.DISCORD_GUILD_ID?.trim() || null,
  };
}

module.exports = { loadConfig };
