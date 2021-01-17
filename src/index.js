"use strict";
require("dotenv").config();
const Discord = require("discord.js");
const axios = require("axios");
const path = require("path");
const Scrapper = require("./Scrapper");

const API_URL = "https://audiosparazap.com/";
const RISADINHA = path.join(__dirname, "/audios/risada.mp3");
const BOA_NOITE = path.join(__dirname, "/audios/boanoite.mp3");
const EH_MEMO = path.join(__dirname, "/audios/ehmemo.mp3");
const SEXTA = path.join(__dirname, "/audios/sexta.mp3");

const client = new Discord.Client();
const scrapper = new Scrapper();

client.on("ready", () => {
  console.log("I am ready!");

  scrapper.getAllAudios();
});

client.on("message", (message) => {
  const contain = (target) => {
    return message.content.toLowerCase().includes(target);
  };

  const starts = (target) => {
    return message.content.toLowerCase().startsWith(target);
  };

  const playAudio = async (path) => {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();

      const dispatcher = connection.play(path);
      dispatcher.on("finish", () => {
        dispatcher.destroy();
        message.member.voice.channel.leave();
      });
    }
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
    playAudio(RISADINHA);
  }

  if (contain("boa noite")) {
    playAudio(BOA_NOITE);
  }

  if (contain("é mesmo") || contain("eh memo")) {
    playAudio(EH_MEMO);
  }

  if (contain("chegou sexta")) {
    playAudio(SEXTA);
  }

  if (starts("=audios")) {
    message.channel.send(
      "Áudios disponíveis localmente:\n'risadinha', 'boa noite', 'eh memo', 'chegou sexta'"
    );
    message.channel.send(`${scrapper.audios.length} disponíveis na nuvem.`);
  }

  if (starts("=random")) {
    if (scrapper.isAvaiable()) {
      playAudio(scrapper.getRandom());
    } else {
      message.channel.send("Os áudios ainda não foram carregados.");
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