import dotenv from "dotenv";
import Discord from "discord.js";
import axios from "axios";
import _ from "lodash";
import Scrapper from "./lib/Scrapper";
import { shouldDo, useMessageUtils } from "./lib/utils";
import * as audios from "./resources/localAudios";
import dialogs from "./resources/dialogs";

dotenv.config();
const API_URL = process.env.API_URL;
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
      const embed = new Discord.MessageEmbed()
        .setTitle("Zacarias BOT")
        .setDescription(dialogs.help)
        .setURL("https://github.com/davigsousa/zacarias-bot")
        .setFooter("Divirta-se!");

      mSend(embed);
      playAudio(audios.ZACARIAS);
    }

    if (contain("risadinha") || contain("risada")) {
      playAudio(audios.RISADINHA);
    }

    if (contain("boa noite")) {
      playAudio(audios.BOA_NOITE);
    }

    if (contain("é mesmo") || contain("eh memo")) {
      playAudio(audios.EH_MEMO);
    }

    if (contain("chegou sexta")) {
      playAudio(audios.SEXTA);
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

      scrapper.getRandom().then((random) => {
        const embed = new Discord.MessageEmbed()
          .setTitle(random.name)
          .setDescription("Clique para baixar")
          .setURL(random.url);

        playAudio(random.url);
        mSend(embed);
      });
    }

    // Api de piadas (Parou de)
    // if (contain("piada") || contain("charada")) {
    //   (async () => {
    //     const response = await axios.get(
    //       "https://us-central1-kivson.cloudfunctions.net/charada-aleatoria",
    //       {
    //         headers: {
    //           Accept: "application/json",
    //         },
    //       }
    //     );

    //     const { pergunta, resposta } = response.data;

    //     mSend(pergunta);
    //     mSend(`R- ${resposta}`);
    //   })();
    // }
  }
});

client.login(process.env.TOKEN);
