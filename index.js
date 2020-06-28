"use strict";
const Discord = require("discord.js");
const axios = require("axios");

const client = new Discord.Client();

let first = true;
const update = new Date();
const updateDate = `${String(update.getDate()).padStart(2, "0")}/${String(
  update.getMonth() + 1
).padStart(2, "0")}/${update.getFullYear()}`;
const updateMessage = `Última atualização realizada em ${updateDate}. Os saves antes disso foram perdidos.`;
const saves = {};

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (first) {
    message.channel.send(updateMessage);
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
  if (starts("=saves")) {
    const parts = message.content.split(" ");

    if (contain("add")) {
      saves[parts[2]] = parts[3];
      message.channel.send(`${parts[2]} salvo com sucesso!`);
    }

    if (contain("get")) {
      if (saves.hasOwnProperty(parts[2])) {
        message.channel.send(saves[parts[2]]);
      } else {
        message.channel.send("Infelizmente não pude achar essa informação.");
      }
    }

    if (contain("list")) {
      message.channel.send("Informações salvas:");
      for (key in saves) {
        message.channel.send(key);
      }
      message.channel.send("===================");
    }
  }

  if (starts("=update")) message.channel.send(updateMessage);
});

client.login("NzI1MTY5NTg1NTEwMTU0Mjgz.XvK26Q.s0dUM0A2xDOzXuE7VyDIgP64xqk");
