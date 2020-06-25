"use strict";
const Discord = require("discord.js");
const axios = require("axios");

const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (message.content === "ping") {
    message.channel.send("pong");
  }

  if (
    message.content.toLowerCase().includes("otario") ||
    message.content.toLowerCase().includes("otaru") ||
    message.content.toLowerCase().includes("otário")
  ) {
    message.channel.send("Euuuuu!!");
  }

  if (
    message.content.toLowerCase().includes("piada") ||
    message.content.toLowerCase().includes("charada")
  ) {
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

client.login("NzI1MTY5NTg1NTEwMTU0Mjgz.XvK26Q.s0dUM0A2xDOzXuE7VyDIgP64xqk");
