"use strict";
require("dotenv").config();
const Discord = require("discord.js");
const axios = require("axios");
const path = require("path");
const _ = require("lodash");
const Scrapper = require("./Scrapper");

const API_URL = "https://audiosparazap.com/";

const AUDIO_PATH = path.join(__dirname, "..", "/audios");
const ZACARIAS = path.join(AUDIO_PATH, "zacarias.mp3");
const RISADINHA = path.join(AUDIO_PATH, "risada.mp3");
const BOA_NOITE = path.join(AUDIO_PATH, "boanoite.mp3");
const EH_MEMO = path.join(AUDIO_PATH, "ehmemo.mp3");
const SEXTA = path.join(AUDIO_PATH, "sexta.mp3");

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

  // Random React
  if (true) {
    message.react(_.sample([":smiling_face_with_tear:", ":joy:", ":rofl:"]));
  }

  // Ping Pong
  if (message.content === "ping") {
    message.channel.send("pong");
  }

  if (starts("-z") || contain("zacarias")) {
    // audios
    if (
      message.content.trim() === "-z" ||
      message.content.trim() === "zacarias"
    ) {
      playAudio(ZACARIAS);
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

    if (contain("audios")) {
      message.channel.send(
        "Áudios disponíveis localmente:\n'risadinha', 'boa noite', 'eh memo', 'chegou sexta'"
      );
    }

    if (contain("random") || (contain("manda") && contain("audio"))) {
      const scrapper = new Scrapper(API_URL);

      scrapper.getRandom().then((random) => {
        playAudio(random);
      });
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
  }
});

client.login(process.env.TOKEN);
