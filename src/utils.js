const Discord = require("discord.js");
const _ = require("lodash");

/**
 * Return all discord message utilitaries
 * @param {Discord.Message} message
 */
function useMessageUtils(message) {
  /**
   * Send message to Channel.
   * @param {string} target
   */
  const mSend = (target) => {
    message.channel.send(target);
  };

  /**
   * check if the target is contained on content
   * @param {string} target
   */
  const contain = (target) => {
    return message.content.toLowerCase().includes(target);
  };

  /**
   * check if the content is started by target
   * @param {string} target
   */
  const starts = (target) => {
    return message.content.toLowerCase().startsWith(target);
  };

  /**
   * Enter voice channel and play audio file
   * @param {string} path Audio file path
   */
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

  return { mSend, contain, starts, playAudio };
}

/**
 * Pass the event chance to occur, so, 10%, chance = 1.
 * @param {1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9} chance
 * @returns {boolean} boolean value
 */
function shouldDo(chance) {
  let chances = [];
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
