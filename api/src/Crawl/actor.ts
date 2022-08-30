import * as cheerio from "cheerio";
import * as request from "request-promise";
import * as fs from "fs";

import { Actor } from "entities";

import { createEntity } from "utils/entityHandler";
import { first } from "cheerio/lib/api/traversing";

export const crawlActor = (actorId: string) => {
  const actorLink = "https://www.imdb.com" + "/name/" + actorId;
  return new Promise<Actor | null>((resolve) => {
    request
      .get(actorLink)
      .then(async (d: any) => {
        const $ = cheerio.load(d);
        const name = getName($);
        if (!name) return resolve(null);
        const avatarPath = await getAvatar($, actorId);
        const overView = getBioText($);
        const birthPlace = getBirthPlace($);
        const birthDate = getBirthDate($);
        const data = {
          id: actorId,
          name,
          avatar: avatarPath,
          overView,
          birthPlace,
          birthDate,
        };
        const entity = await createEntity(Actor, data);
        console.log("created actor " + name);
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
