"use strict";
require("dotenv").config();
const Discord = require("discord.js");
const axios = require("axios");
const path = require("path");

RISADINHA = path.join(__dirname, "/audios/risada.mp3");

const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  const contain = (target) => {
    return message.content.toLowerCase().includes(target);
  };

  const starts = (target) => {
    return message.content.toLowerCase().startsWith(target);
  };

  // Ping Pong
  if (message.content === "ping") {
    message.channel.send("pong");
  }

  // Besteira
  if (contain("otario") || contain("otaru") || contain("otário")) {
    message.channel.send("Sou euuuuu!!");
  }

  if (contain("risadinha" || contain("risada"))) {
    if (message.member.voice.channel) {
      (async () => {
        const connection = await message.member.voice.channel.join();

        const dispatcher = connection.play(RISADINHA);
        dispatcher.on("finish", () => {
          dispatcher.destroy();
          message.member.voice.channel.leave();
        });
      })();
    }
  }

  if (contain("mutado")) {
    message.channel.send("sai cachorro vei fei daqui");
  }

  // Api de piadas
  if (contain("piada") || contain("charada")) {
    (async () => {
      const response = await axios.default.get(
        "https://us-central1-kivson.cloudfunctions.net/charada-aleatoria",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const { pergunta, resposta } = response.data;

      message.channel.send(pergunta);
      message.channel.send(`R- ${resposta}`);
    })();
  }
});

client.login(process.env.TOKEN);
