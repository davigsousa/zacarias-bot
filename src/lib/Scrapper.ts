import axios from "axios";
import cheerio from "cheerio";
import _ from "lodash";
import { between } from "./utils";

interface Audio {
  name: string;
  url: string;
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
    const names = $("div.audioname h3 a").get();

    const mp3s: Audio[] = [];
    for (let i = 0; i < imgs.length; i++) {
      const audio = {
        name: names[i].children[0].data,
        url: imgs[i].attribs["data-href"],
      };

      mp3s.push(audio);
    }

    return _.sample(mp3s);
  }
}

export default Scrapper;
