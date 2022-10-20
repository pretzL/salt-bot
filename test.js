require("dotenv/config");

function test(expectedSecret) {
  const secretMatches = process.env.BOT_KEY == expectedSecret;
  return secretMatches;
}
