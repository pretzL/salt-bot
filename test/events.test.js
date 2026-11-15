const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { Events } = require("discord.js");

const eventsDir = path.join(__dirname, "..", "events");
const files = fs.readdirSync(eventsDir).filter((file) => file.endsWith(".js"));

// Object.values includes the deprecated "ready" alias, so an accidental typo
// like name: "ready" still passes, but an invented event name does not.
const knownEvents = new Set(Object.values(Events));

test("there is at least one event handler", () => {
  assert.ok(files.length > 0);
});

test("every handler listens to a known Discord event", () => {
  for (const file of files) {
    const event = require(path.join(eventsDir, file));

    assert.equal(typeof event.name, "string", `events/${file} is missing "name"`);
    assert.ok(knownEvents.has(event.name), `events/${file} listens to unknown event "${event.name}"`);
    assert.equal(typeof event.execute, "function", `events/${file} is missing "execute"`);
  }
});

test("the client ready handler is registered as once", () => {
  const ready = require(path.join(eventsDir, "ready.js"));
  assert.equal(ready.name, Events.ClientReady);
  assert.equal(ready.once, true);
});
