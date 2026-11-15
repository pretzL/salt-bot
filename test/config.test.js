const test = require("node:test");
const assert = require("node:assert/strict");
const { loadConfig } = require("../config");

const VALID_ENV = {
  DISCORD_TOKEN: "test-token",
  DISCORD_CLIENT_ID: "1234567890",
};

test("throws when required variables are missing", () => {
  assert.throws(() => loadConfig({}), {
    code: "ERR_MISSING_ENV",
    message: /DISCORD_TOKEN, DISCORD_CLIENT_ID/,
  });
});

test("names only the variables that are actually missing", () => {
  assert.throws(() => loadConfig({ DISCORD_TOKEN: "test-token" }), {
    message: /DISCORD_CLIENT_ID/,
  });
  assert.throws(() => loadConfig({ DISCORD_CLIENT_ID: "1234567890" }), (error) => {
    assert.match(error.message, /DISCORD_TOKEN/);
    assert.doesNotMatch(error.message, /DISCORD_CLIENT_ID/);
    return true;
  });
});

test("treats blank values as missing", () => {
  assert.throws(() => loadConfig({ ...VALID_ENV, DISCORD_TOKEN: "   " }), {
    code: "ERR_MISSING_ENV",
  });
});

test("trims surrounding whitespace", () => {
  const config = loadConfig({
    DISCORD_TOKEN: "  test-token  ",
    DISCORD_CLIENT_ID: "  1234567890  ",
  });

  assert.deepEqual(config, {
    token: "test-token",
    clientId: "1234567890",
    guildId: null,
  });
});

test("guildId is optional", () => {
  assert.equal(loadConfig(VALID_ENV).guildId, null);
  assert.equal(loadConfig({ ...VALID_ENV, DISCORD_GUILD_ID: "" }).guildId, null);
  assert.equal(loadConfig({ ...VALID_ENV, DISCORD_GUILD_ID: "42" }).guildId, "42");
});
