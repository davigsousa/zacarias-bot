import Discord from "discord.js";
import _ from "lodash";

/**
 * Return all discord message utilitaries
 * @param {Discord.Message} message
 */
function useMessageUtils(message: Discord.Message) {
  /**
   * Send message to Channel.
   * @param {string} target
   */
  const mSend = (target: string) => {
    message.channel.send(target);
  };

  /**
   * check if the target is contained on content
   * @param {string} target
   */
  const contain = (target: string) => {
    return message.content.toLowerCase().includes(target);
  };

  /**
   * check if the content is started by target
   * @param {string} target
   */
  const starts = (target: string) => {
    return message.content.toLowerCase().startsWith(target);
  };

  /**
   * Enter voice channel and play audio file
   * @param {string} path Audio file path
   */
  const playAudio = async (path: string) => {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();

      const dispatcher = connection.play(path);
      dispatcher.on("finish", () => {
        dispatcher.destroy();
        message.member.voice.channel.leave();
      });
    }
  };

  return { mSend, contain, starts, playAudio };
}

type Chance = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/**
 * Pass the event chance to occur, so, 10%, chance = 1.
 * @param {Chance} chance
 * @returns {boolean} boolean value
 */
function shouldDo(chance: Chance) {
  let chances: boolean[] = [];
  while (chance--) {
    chances = [...chances, true];
  }

  let remain = 10 - chance;
  while (remain--) {
    chances = [...chances, false];
  }

  return _.sample(chances);
}

module.exports = { useMessageUtils, shouldDo };
