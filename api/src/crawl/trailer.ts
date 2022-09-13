import * as cheerio from "cheerio";
import * as request from "request-promise";
import * as fs from "fs";

import { Trailer } from "entities";

import { createEntity } from "utils/entityHandler";
import { genereteUID } from "utils/file";

export const crawlTrailers = () => {
  const home = "https://www.imdb.com";
  return new Promise<Trailer[]>((resolve) => {
    request
      .get(home)
      .then(async (d: any) => {
        const $ = cheerio.load(d);
        const trailers = [...$(".swiper-slide")];
        const trailerInstances = await Promise.all(
          trailers.map((trailer) => crawlTrailer($, trailer))
        );

        resolve(trailerInstances);
      })
      .catch((error: any) => console.log(error));
  });
};

const crawlTrailer = async ($: cheerio.CheerioAPI, elCtn: cheerio.Element) => {
  const poster = await getPoster($, elCtn);
  const screenShot = await getScreenshot($, elCtn);
  const caption = getCaption($, elCtn);
  const data = {
    poster,
    screenShot,
    ...caption,
  };
  return createEntity(Trailer, data);
};

const getPoster = ($: cheerio.CheerioAPI, ctn: cheerio.Element) => {
  const imgSet = $(ctn)
    .find(".ipc-poster .ipc-media img")
    .first()
    .attr("srcset");
  if (!imgSet) return "";
  const imageUri = imgSet.split(", ")[2].split(" ")[0];
  const fileExtension = imageUri.substring(
    imageUri.lastIndexOf("."),
    imageUri.length
  );
  const imageName = `${genereteUID()}${fileExtension}`;
  return downloadImage(imageUri, imageName);
};

const getScreenshot = ($: cheerio.CheerioAPI, ctn: cheerio.Element) => {
  const imgSet = $(ctn)
    .find(".ipc-slate .ipc-media img")
    .first()
    .attr("srcset");
  if (!imgSet) return "";
  const imageUri = imgSet.split(", ")[2].split(" ")[0];
  const fileExtension = imageUri.substring(
    imageUri.lastIndexOf("."),
    imageUri.length
  );
  const imageName = `${genereteUID()}${fileExtension}`;
  return downloadImage(imageUri, imageName);
};

const getCaption = ($: cheerio.CheerioAPI, ctn: cheerio.Element) => {
  const wrapper = $(ctn).find("figcaption div").eq(1);
  const info = $(wrapper).find("div").eq(1).text();
  const name = $(wrapper).find("div").first().find("span").first().text();
  const duration = $(wrapper).find("div").first().find("span").eq(1).text();
  return { info, name, duration };
};

const downloadImage = function (uri: string, filename: string) {
  const filePath = "./public/images/" + filename;
  return new Promise<string>((resolve) => {
    request.head(uri, function (err: any, res: any, body: any) {
      request
        .get(uri)
        .pipe(fs.createWriteStream(filePath))
        .on("close", () => {
          resolve("/images/" + filename);
        });
    });
  });
};
