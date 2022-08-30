import Movie from "entities/Movie";
import {
  createEntity,
  deleteEntity,
  findEntities,
  findEntity,
  findEntityById,
  validateAndSaveEntity,
} from "utils/entityHandler";
import { updateList as updateActorRoleMovieList } from "./actorRoleMovie";
import { asyncCatchErr } from "utils/asyncCatchErr";
import { EntityNotFoundError } from "errors/customErrors";
import {
  moveFile,
  deleteFile,
  getMoviePosterPath,
  isSamePath,
  servePathToRealPath,
} from "utils/file";

export const getAll = asyncCatchErr(async (req, res) => {
  const movies = await findEntities(Movie, {
    relations: { actors: { actor: true }, director: true },
  });
  res.status(200).send({ success: true, data: movies });
});

export const getById = asyncCatchErr(async (req, res) => {
  const id = req.params.movieId;
  const movies = await findEntity(Movie, {
    where: { id },
    relations: { actors: { actor: true }, director: true },
  });
  res.status(200).send({ success: true, data: movies });
});

export const create = asyncCatchErr(async (req, res) => {
  const movie = await createEntity(Movie, req.body);
  res.status(200).send({ movie });
});

export const update = asyncCatchErr(async (req, res, next) => {
  const instance = await findEntity(Movie, {
    where: { id: req.params.movieId },
    relations: {
      actors: true,
    },
  });
  if (!instance) throw new EntityNotFoundError(Movie.name);
  const actorRoleMovies = await updateActorRoleMovieList(
    instance.actors,
    req.body.actors
  );
  console.log("actorRoleMovies ", actorRoleMovies);

  req.tempFile.previousFilePath = instance.poster;
  if (req.tempFile.tempFilePath) {
    const { newFileExtension } = req.tempFile;
    const [servePosterPath, realPosterPath] = getMoviePosterPath(
      req.params.movieId,
      newFileExtension || "jpg"
    );
    req.tempFile.newFilePath = realPosterPath;
    Object.assign(instance, req.body, {
      poster: servePosterPath,
      actors: actorRoleMovies,
    });
  } else Object.assign(instance, req.body, { actors: actorRoleMovies });

  const movie = await validateAndSaveEntity(instance);
  res.response = { success: true, data: movie };
  next();
});

export const remove = asyncCatchErr(async (req, res) => {
  const movie = await deleteEntity(Movie, req.params.movieId);
  res.status(200).send({ movie });
});

export const updateMoviePosterFile = asyncCatchErr(async (req, res, next) => {
  const { poster } = req.body;
  const {
    tempFilePath,
    previousFilePath: previousServeFilePath,
    newFilePath,
  } = req.tempFile;
  const previousFilePath = servePathToRealPath(previousServeFilePath || "");
  if (req.tempFile.tempFilePath) {
    moveFile(tempFilePath || "", newFilePath || "");
    if (previousFilePath && !isSamePath(previousFilePath, newFilePath || ""))
      await deleteFile(previousFilePath); //delete old poster file
  } else if (!poster && previousFilePath) {
    await deleteFile(previousFilePath); //delete old poster file
  }
  next();
});
