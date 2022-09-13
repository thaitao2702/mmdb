import * as cheerio from "cheerio";
import * as request from "request-promise";
import * as fs from "fs";

import { Director } from "entities";

import { createEntity } from "utils/entityHandler";
import { first } from "cheerio/lib/api/traversing";

export const crawlDirector = (directorId: string) => {
  const directorLink = "https://www.imdb.com" + "/name/" + directorId;
  return new Promise<Director>((resolve) => {
    request
      .get(directorLink)
      .then(async (d: any) => {
        const $ = cheerio.load(d);
        const avatarPath = await getAvatar($, directorId);
        const overView = getBioText($);
        const birthPlace = getBirthPlace($);
        const birthDate = getBirthDate($);
        const name = getName($);
        const data = {
          name,
          avatar: avatarPath,
          overView,
          birthPlace,
          birthDate,
        };
        const entity = await createEntity(Director, data);
        resolve(entity);
      })
      .catch((error: any) => console.log(error));
  });
};

const getAvatar = ($: cheerio.CheerioAPI, actorId: string) => {
  const imageUrl = $("#name-poster").first().attr("src") || "";
  if (!imageUrl) return undefined;
  const fileExtension = imageUrl.substring(
    imageUrl.lastIndexOf("."),
    imageUrl.length
  );
  const imageName = `avatar_${actorId}${fileExtension}`;
  return downloadImage(imageUrl, imageName);
};

const getName = ($: cheerio.CheerioAPI) => {
  return $(".name-overview-widget__section .itemprop").first().text() || "";
};

const getBioText = ($: cheerio.CheerioAPI) => {
  return $("#name-bio-text .inline").first().text() || "";
};

const getBirthDate = ($: cheerio.CheerioAPI) => {
  let birthDate = new Date($("time").first().attr("datetime") || "1972");
  birthDate =
    birthDate instanceof Date && !isNaN(Number(birthDate))
      ? birthDate
      : new Date("1972");
  return birthDate;
};

const getBirthPlace = ($: cheerio.CheerioAPI) => {
  return $("#name-born-info a").last().text() || "";
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
