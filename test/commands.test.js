const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const commandsDir = path.join(__dirname, "..", "commands");
const files = fs.readdirSync(commandsDir).filter((file) => file.endsWith(".js"));

test("there is at least one command", () => {
  assert.ok(files.length > 0);
});

test("every command exports a valid slash command builder and execute function", () => {
  const names = new Map();

  for (const file of files) {
    const command = require(path.join(commandsDir, file));

    assert.ok(command.data, `commands/${file} is missing "data"`);
    assert.equal(typeof command.data.toJSON, "function", `commands/${file} "data" must be a SlashCommandBuilder`);
    assert.equal(typeof command.execute, "function", `commands/${file} is missing "execute"`);

    const { name, description } = command.data.toJSON();

    assert.match(name, /^[\w-]{1,32}$/, `commands/${file} has an invalid command name "${name}"`);
    assert.ok(description && description.length > 0, `commands/${file} has no description`);
    assert.ok(!names.has(name), `commands/${file} reuses the command name "${name}" from ${names.get(name)}`);

    names.set(name, file);
  }
});
