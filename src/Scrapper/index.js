const axios = require("axios");
const cheerio = require("cheerio");
const _ = require("lodash");
const { sleep } = require("sleep");

class Scrapper {
  constructor(url) {
    this.url = url;
    this.audios = [];
  }

  async getAllAudios() {
    for (let i = 2; i <= 109; i++) {
      sleep(1);
      const response = await axios.default.get(`${this.url}/page/${i}`);

      const $ = cheerio.load(response.data);
      const imgs = $('img[alt="play now"]').get();

      const mp3s = [];
      for (const img of imgs) {
        mp3s.push(img.attribs["data-href"]);
      }

      this.audios = [...this.audios, mp3s];
    }
  }

  getRandom() {
    return _.sample(this.audios);
  }

  isAvaiable() {
    return this.audios.length > 0;
  }
}

module.exports = Scrapper;
