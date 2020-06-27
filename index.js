"use strict";
const Discord = require("discord.js");
const axios = require("axios");

const client = new Discord.Client();

let first = true;
let update = new Date();
let updateDate = `${String(update.getDate()).padStart(2, "0")}/${String(
  update.getMonth() + 1
).padStart(2, "0")}/${update.getFullYear()}`;
const saves = {};

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (first) {
    message.channel.send(
      `Última atualização realizada em ${updateDate}. Os saves antes disso foram perdidos.`
    );
    first = false;
  }

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

  // Comandos
  if (starts("=save")) {
    const parts = message.content.split(" ");
    saves[parts[1]] = parts[2];
    message.channel.send(`${parts[1]} salvo com sucesso!`);
  }

  if (starts("=get")) {
    const parts = message.content.split(" ");
    if (saves.hasOwnProperty(parts[1])) {
      message.channel.send(saves[parts[1]]);
    } else {
      message.channel.send("Infelizmente não pude achar essa informação.");
    }
  }

  if (starts("=update")) message.channel.send(updateDate);
});

client.login("NzI1MTY5NTg1NTEwMTU0Mjgz.XvK26Q.s0dUM0A2xDOzXuE7VyDIgP64xqk");
