import * as cheerio from "cheerio";
import * as request from "request-promise";
import * as fs from "fs";

import { crawlActor } from "crawl/actor";
import { Movie, ActorRoleMovie } from "../entities";
import { createEntity } from "../utils/entityHandler";

import { MovieCategory } from "const/movie";
import { crawlDirector } from "crawl/director";

export const crawlMovie = (
  linkList: { movieId: string; movieLink: string }[]
) => {
  if (linkList.length == 0) return;
  const movie = linkList[0];
  request
    .get(movie.movieLink)
    .then(async (d: any) => {
      const $ = cheerio.load(d);
      const image = $(".ipc-image");
      const imageSet = (image as any).attr("srcset").split(", ");
      const imageUri = imageSet[2].split(" ")[0];
      const fileExtension = imageUri.substring(
        imageUri.lastIndexOf("."),
        imageUri.length
      );
      const title = getTitle($);
      console.log(`start movie ${title}, ${linkList.length} movies remain`);
      const genres = getMovieGenre($);
      const filename = "movie-poster_" + movie.movieId + fileExtension;
      const poster = await download(imageUri, filename);
      const plot = getPlot($);
      const writers = getWriter($);
      const director = await getDirector($);
      const casts = await getCast($, movie.movieId, title);
      const rating = getRating($);
      const numberOfVotes = getNumberOfVotes($);
      const runtime = getRuntime($);
      const releasedDate = getReleaseDate($);

      const data = {
        title,
        plot,
        poster,
        releasedDate,
        movieCategory: genres,
        writers,
        director,
        rating,
        numberOfVotes,
        runtime,
      };

      const movieInstance = await createEntity(Movie, data);

      await Promise.all(
        casts.map((cast) => {
          if (cast) {
            cast.movieId = movieInstance.id;
            createEntity(ActorRoleMovie, cast);
          }
          return cast;
        })
      );
      //fs.writeFileSync("data.json", JSON.stringify(cast));
      console.log("created movie " + title);
      console.log("----------------------------------------------------");

      const newLinkList = linkList.slice(1);
      setTimeout(() => {
        crawlMovie(newLinkList);
      }, 100);
    })
    .catch((error: any) => console.log(error));
};

const getMovieGenre = ($: cheerio.CheerioAPI) => {
  let genres: MovieCategory[] = [];
  $(".ipc-chip--on-baseAlt").each((index, el) => {
    const genre = $(el).text().trim();
    const key = genre.toUpperCase();
    if (key in MovieCategory)
      genres.push(MovieCategory[key as keyof typeof MovieCategory]);
  });
  return genres;
};

const getTitle = ($: cheerio.CheerioAPI) => {
  let title = $("[data-testid=hero-title-block__title]").first().text();
  const originalTitle = $("[data-testid=hero-title-block__original-title]")
    .first()
    .text();
  if (originalTitle) title = originalTitle.split("Original title: ")[1];
  return title;
};

const getPlot = ($: cheerio.CheerioAPI) => {
  const selector = "[data-testid=plot-l]";
  return $($(selector)[0]).text();
};

const getRating = ($: cheerio.CheerioAPI) => {
  return +$("[data-testid=hero-rating-bar__aggregate-rating__score] span")
    .first()
    .text();
};

const getReleaseDate = ($: cheerio.CheerioAPI) => {
  const text = $("[data-testid=title-details-releasedate] ul li a")
    .first()
    .text();
  if (text) {
    const date = text.split("(")[0].trim();
    if (date) {
      let releaseDate = new Date(date);
      releaseDate =
        releaseDate instanceof Date && !isNaN(Number(releaseDate))
          ? releaseDate
          : new Date("1972");
      return releaseDate;
    }
  } else return new Date("1972");
};

const getRuntime = ($: cheerio.CheerioAPI) => {
  const text = $(
    "[data-testid=title-techspec_runtime] .ipc-metadata-list-item__content-container"
  )
    .first()
    .text()
    .trim();
  if (!text) return 120;
  const regex = /(\d+)([a-zA-Z\s])+(\d+)?/;
  const match = text.match(regex);
  const hours = (match && match[1]) || 0;
  const minutes = (match && match[3]) || 0;
  console.log(
    `hours ${hours}, minutes ${minutes}, total ${
      !isNaN(+hours) ? +hours * 60 + (!isNaN(+minutes) ? +minutes : 0) : 120
    }`
  );
  return !isNaN(+hours) ? +hours * 60 + (!isNaN(+minutes) ? +minutes : 0) : 120;
};

const getWriter = ($: cheerio.CheerioAPI) => {
  const ctn = $("[data-testid=title-pc-principal-credit]").eq(1);
  const ctnTitle = $(ctn)
    .find(".ipc-metadata-list-item__label")
    .first()
    .text()
    .trim()
    .toLowerCase();
  if (ctnTitle.includes("writer")) {
    const writersEl = $(ctn).find("ul li a");
    return [...writersEl].map((writer) => $(writer).text().trim());
  } else return [];
};

const getDirector = ($: cheerio.CheerioAPI) => {
  const ctn = $("[data-testid=title-pc-principal-credit]").first();
  const ctnTitle = $(ctn)
    .find(".ipc-metadata-list-item__label")
    .first()
    .text()
    .trim()
    .toLowerCase();
  if (ctnTitle === "director") {
    const nameEl = $(ctn).find("a").first();
    const directorId = nameEl.attr("href")?.split("/")[2] || "";
    return crawlDirector(directorId);
  }
};

const getNumberOfVotes = ($: cheerio.CheerioAPI) => {
  let votes = $("[data-testid=hero-rating-bar__aggregate-rating__score]")
    .first()
    .parent()
    .find("div")
    .last()
    .text()
    .toLowerCase();
  if (votes.indexOf("k") > -1) return +votes.split("k")[0] * 1000;
  if (votes.indexOf("M") > -1) return +votes.split("M")[0] * 1000000;
  return !isNaN(+votes) ? +votes : 1000000;
};

const getCast = (
  $: cheerio.CheerioAPI,
  movieId: string,
  movieTitle: string
) => {
  const $ctn = $("[data-testid=title-cast-item]");
  const ctn = [...$ctn];

  const casts = ctn.map(async (el) => {
    const actorId = getPath(
      $(el).find("[data-testid=title-cast-item__actor]").first().attr("href")
    ).split("/")[2];
    const actorName = $(el)
      .find("[data-testid=title-cast-item__actor]")
      .first()
      .text();
    const actorRole = $(el)
      .find("[data-testid=cast-item-characters-list] li")
      .first()
      .text();
    const createdActor = await crawlActor(actorId);
    if (!createdActor) return createdActor;

    const actorRoleMovie = new ActorRoleMovie();
    actorRoleMovie.role = actorRole;
    actorRoleMovie.actorId = createdActor.id;
    return actorRoleMovie;
  });

  return Promise.all(casts);
};

const download = function (uri: string, filename: string) {
  console.log("imgUrl ", uri);
  const imagePath = "./public/images/" + filename;
  return new Promise<string>((resolve) => {
    request.head(uri, function (err: any, res: any, body: any) {
      request
        .get(uri)
        .pipe(fs.createWriteStream(imagePath))
        .on("close", () => {
          resolve("/images/" + filename);
        });
    });
  });
};

const getPath = (value: string | undefined) => (value || "").split(/[?#]/)[0];
