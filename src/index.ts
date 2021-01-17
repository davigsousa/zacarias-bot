import dotenv from "dotenv";
import Discord from "discord.js";
import axios from "axios";
import path from "path";
import _ from "lodash";
import Scrapper from "./Scrapper";
import { shouldDo, useMessageUtils } from "./utils";
dotenv.config();

const API_URL = process.env.API_URL;

const AUDIO_PATH = path.join(__dirname, "..", "/audios");
const ZACARIAS = path.join(AUDIO_PATH, "zacarias.mp3");
const RISADINHA = path.join(AUDIO_PATH, "risada.mp3");
const BOA_NOITE = path.join(AUDIO_PATH, "boanoite.mp3");
const EH_MEMO = path.join(AUDIO_PATH, "ehmemo.mp3");
const SEXTA = path.join(AUDIO_PATH, "sexta.mp3");

const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");

  client.user.setActivity({ name: "-z ou zacarias", type: "WATCHING" });
});

client.on("message", (message) => {
  const { mSend, contain, starts, playAudio } = useMessageUtils(message);

  // Random React
  if (shouldDo(1)) {
    message.react(_.sample(["😂", "🤣", "😆", "🥲"]));
  }

  if (starts("-z") || contain("zacarias")) {
    // audios
    if (
      message.content.trim() === "-z" ||
      message.content.trim() === "zacarias"
    ) {
      playAudio(ZACARIAS);
    }

    if (contain("risadinha") || contain("risada")) {
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
      mSend(
        "Áudios disponíveis localmente:\n'risadinha', 'boa noite', 'eh memo', 'chegou sexta'"
      );
    }

    if (contain("leave")) {
      message.member.voice.channel.leave();
    }

    if (contain("random") || (contain("manda") && contain("audio"))) {
      const scrapper = new Scrapper(API_URL);

      scrapper.getRandom().then((random: string) => {
        playAudio(random);
      });
    }

    // Api de piadas
    if (contain("piada") || contain("charada")) {
      (async () => {
        const response = await axios.get(
          "https://us-central1-kivson.cloudfunctions.net/charada-aleatoria",
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        const { pergunta, resposta } = response.data;

        mSend(pergunta);
        mSend(`R- ${resposta}`);
      })();
    }
  }
});

client.login(process.env.TOKEN);
