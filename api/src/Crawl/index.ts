import "module-alias/register";
import "dotenv/config";

import * as cheerio from "cheerio";
import * as request from "request-promise";
import * as fs from "fs";

import initDatabase from "../database/createConnection";
import { crawlMovie } from "crawl/movie";
import { crawlTrailers } from "crawl/trailer";

export const baseUrl = "https://www.imdb.com";

const start = () => {
  console.log("start");
  request
    .get("https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm")
    .then((data: any) => {
      const $ = cheerio.load(data);
      let movieLinkList: { movieId: string; movieLink: string }[] = [];
      $(".titleColumn").each((i, el) => {
        const movieId = ("" + $(el).find("a:first-child").attr("href")).split(
          "/"
        )[2];
        const movieLink = baseUrl + "/title/" + movieId;
        movieLinkList.push({ movieId, movieLink });
      });
      crawlMovie(movieLinkList);

      //fs.writeFileSync("data.json", JSON.stringify(movieLinkList));
    })
    .catch((err: any) => console.log("err", err));
};

const initDirectory = () => {
  const imagePath =
    (process.env.PUBLIC_PATH || "") + (process.env.IMAGE_PATH || "");
  const tempImagePath = process.env.IMAGE_TEMP;
  if (imagePath && tempImagePath) {
    fs.mkdir(imagePath, { recursive: true }, (err) => {
      if (err) throw err;
    });
    fs.mkdir(tempImagePath, { recursive: true }, (err) => {
      if (err) throw err;
    });
  }
};

const init = async () => {
  initDirectory();
  await initDatabase();
  console.log("Connect DB Success");
  await crawlTrailers();
  start();
};

const test = async () => {
  console.log("initDatabase", initDatabase);
  await initDatabase();
  console.log("done database");
  await crawlTrailers();
};
init();
//test();
