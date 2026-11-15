const { Events } = require("discord.js");

// The one and only Arash.
const ARASH_ID = "160146400447823872";

const RESPONSE = `Alle henvendelser ang IT- eller telefonproblem, bestillinger av brukertilganger, nytt IT utstyr / telefoner, prosjektsupport mm skal alltid meldes inn via IT ServiceDesk. Henvendelsene vil da bli registrert i systemene og løst i korrekt, prioritert og rett rekkefølge. Dette gir IT oversikt over gjentagende problemer og man kan jobbe preventivt for å hindre gjentagende feil. Ved behov vil saken bli tildelt lokal IT. Det vil ikke lenger være mulighet for å svare på IT-support henvendelser via epost.`;

module.exports = {
  name: Events.MessageCreate,
  once: false,
  execute(msg) {
    if (msg.author.bot) return;
    if (!msg.mentions.users.has(ARASH_ID)) return;

    return msg.reply(RESPONSE);
  },
};
