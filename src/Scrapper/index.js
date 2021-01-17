const axios = require("axios");
const cheerio = require("cheerio");
const _ = require("lodash");

class Scrapper {
  constructor(url) {
    this.url = url;
  }

  async getRandom() {
    const response = await axios.default.get(this.url);

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
