require("dotenv/config");

function test(expectedSecret) {
  const secretMatches = process.env.BOT_KEY == expectedSecret;
  console.log(`The Bot key is ${process.env.BOT_KEY}`);
  console.log(`The secret does${secretMatches ? "" : " not"} match!`);
  return secretMatches;
}

test();
