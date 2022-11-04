const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  once: false,
  execute(msg) {
    const triggerWords = ["<@160146400447823872>"];
    triggerWords.forEach((word) => {
      const message = msg.content;
      if (message.includes(word)) {
        msg.reply(
          `Alle henvendelser ang IT- eller telefonproblem, bestillinger av brukertilganger, nytt IT utstyr / telefoner, prosjektsupport mm skal alltid meldes inn via IT ServiceDesk. Henvendelsene vil da bli registrert i systemene og løst i korrekt, prioritert og rett rekkefølge. Dette gir IKEA IT oversikt over gjentagende problemer og man kan jobbe preventivt for å hindre gjentagende feil. Ved behov vil saken bli tildelt lokal IT. Det vil ikke lenger være mulighet for å svare på IT-support henvendelser via epost.`
        );
      }
    });
  },
};
