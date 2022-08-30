import "module-alias/register";
import "dotenv/config";

import * as cheerio from "cheerio";
import * as request from "request-promise";
import * as fs from "fs";

import initDatabase from "../database/createConnection";
import { crawlMovie } from "Crawl/movie";
import { crawlActor } from "Crawl/actor";

export const baseUrl = "https://www.imdb.com";

const start = () => {
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

const init = async () => {
  await initDatabase();
  console.log("Connect DB Success");
  start();
};

const test = async () => {
  console.log("initDatabase", initDatabase);
  await initDatabase();
  console.log("done database");
  crawlMovie([
    {
      movieId: "tt13314558",
      movieLink: "https://www.imdb.com/title/tt13314558/",
    },
    {
      movieId: "tt1649418",
      movieLink: "https://www.imdb.com/title/tt1649418/",
    },
    {
      movieId: "tt1745960",
      movieLink: "https://www.imdb.com/title/tt1745960/",
    },
  ]);
};
init();
//test();
