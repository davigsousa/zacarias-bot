import axios from "axios";
import cheerio from "cheerio";
import _ from "lodash";

function between(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

class Scrapper {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async getRandom() {
    const i = between(1, 110);
    const response = await axios.get(`${this.url}/page/${i}`);

    const $ = cheerio.load(response.data);
    const imgs = $('img[alt="play now"]').get();

    const mp3s: string[] = [];
    for (const img of imgs) {
      mp3s.push(img.attribs["data-href"]);
    }

    return _.sample(mp3s);
  }
}

module.exports = Scrapper;
