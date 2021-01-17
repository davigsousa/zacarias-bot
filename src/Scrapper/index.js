const axios = require("axios");
const cheerio = require("cheerio");
const _ = require("lodash");

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

class Scrapper {
  constructor(url) {
    this.url = url;
  }

  async getRandom() {
    const i = between(1, 110);
    const response = await axios.default.get(`${this.url}/page/${i}`);

    const $ = cheerio.load(response.data);
    const imgs = $('img[alt="play now"]').get();

    const mp3s = [];
    for (const img of imgs) {
      mp3s.push(img.attribs["data-href"]);
    }

    return _.sample(mp3s);
  }
}

module.exports = Scrapper;
