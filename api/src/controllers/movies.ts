import { Movie, User, Director } from "entities";
import ActorRoleMovie from "entities/ActorRoleMovie";
import {
  createEntity,
  deleteEntity,
  findEntities,
  findEntity,
  findEntityById,
  validateAndSaveEntity,
  createListById,
} from "utils/entityHandler";
import {
  updateList as updateActorRoleMovieList,
  createActorRoleMovieList,
} from "./actorRoleMovie";
import { asyncCatchErr } from "utils/asyncCatchErr";
import { EntityNotFoundError } from "errors/customErrors";
import { MovieList } from "const/movie";
import {
  moveFile,
  deleteFile,
  generateFilePath,
  isSamePath,
  servePathToRealPath,
} from "utils/file";

export const getAll = asyncCatchErr(async (req, res) => {
  const movies = await findEntities(Movie, {
    relations: { actors: { actor: true }, director: true },
  });
  res.status(200).send({ success: true, data: movies });
});

export const getMovieList = asyncCatchErr(async (req, res) => {
  const movies = await findEntities(Movie, {
    take: 14,
  });
  res.status(200).send({ success: true, data: movies });
});

export const getById = asyncCatchErr(async (req, res) => {
  const id = req.params.movieId;
  const movie = await findEntity(Movie, {
    where: { id },
    relations: { actors: { actor: true }, director: true },
  });
  if (!movie) throw new EntityNotFoundError(Movie.name);

  const returnMovie = {
    ...movie,
    actors: movie?.actors.map((actor) => ({
      ...actor,
      actorName: actor.actor.name,
    })),
  };

  res.status(200).send({ success: true, data: returnMovie });
});

export const create = asyncCatchErr(async (req, res, next) => {
  const instance = await Movie.create(req.body);

  if (req.tempFile.tempFilePath) {
    const { newFileExtension } = req.tempFile;
    if (newFileExtension) {
      const [servePosterPath, realPosterPath] =
        generateFilePath(newFileExtension);
      req.tempFile.newFilePath = realPosterPath;
      Object.assign(instance, req.body, {
        poster: servePosterPath,
      });
    }
  }

  const movie = await validateAndSaveEntity(instance);
  await createActorRoleMovieList(req.body.actors, movie.id);
  res.response = { success: true, data: movie };
  next();
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

  req.tempFile.previousFilePath = instance.poster;
  if (req.tempFile.tempFilePath) {
    const { newFileExtension } = req.tempFile;
    if (newFileExtension) {
      const [servePosterPath, realPosterPath] =
        generateFilePath(newFileExtension);
      req.tempFile.newFilePath = realPosterPath;
      Object.assign(instance, req.body, {
        poster: servePosterPath,
        actors: actorRoleMovies,
      });
    }
  } else Object.assign(instance, req.body, { actors: actorRoleMovies });

  const movie = await validateAndSaveEntity(instance);
  res.response = { success: true, data: movie };
  next();
});

export const remove = asyncCatchErr(async (req, res) => {
  const instance = await findEntity(Movie, {
    where: { id: req.params.movieId },
    relations: {
      actors: true,
    },
  });
  if (!instance) throw new EntityNotFoundError(Movie.name);
  const deleteActors = instance.actors.map((actorRoleMovie) =>
    deleteEntity(ActorRoleMovie, actorRoleMovie.id)
  );
  await Promise.all(deleteActors);
  const movie = await deleteEntity(Movie, req.params.movieId);
  res.status(200).send({ success: true, data: movie });
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

export const getMoviesByPage = asyncCatchErr(async (req, res) => {
  const { itemPerPage, pageIndex } = req.body;
  const [result, total] = await Movie.findAndCount({
    order: { createdDate: "ASC" },
    take: itemPerPage || 10,
    skip: pageIndex * itemPerPage,
    relations: {
      actors: {
        actor: true,
      },
      director: true,
    },
  });
  const returnData = {
    data: result,
    count: total,
    success: true,
  };
  res.status(200).send(returnData);
});

export const getAllMovieList = async (currentUser: User) => {
  if (!currentUser) {
    const fanFavoriteMovies = await getRandomMovieList(14);
    const topPickMovies = await getRandomMovieList(18);
    return {
      [MovieList.FANFAVORITES]: createListById(fanFavoriteMovies),
      [MovieList.TOPPICK]: createListById(topPickMovies),
      [MovieList.WATCHLIST]: null,
    };
  } else {
    const id = currentUser.id;
    const user = await findEntity(User, {
      where: { id },
      relations: { watchList: true },
    });
    if (!user) throw new EntityNotFoundError(User.name);
    const watchListMovies = user.watchList || [];
    const fanFavoriteMovies = await getRandomMovieList(14);
    const topPickMovies = await getRandomMovieList(18);
    return {
      [MovieList.FANFAVORITES]: createListById(fanFavoriteMovies),
      [MovieList.TOPPICK]: createListById(topPickMovies),
      [MovieList.WATCHLIST]: createListById(watchListMovies),
    };
  }
};

const getRandomMovieList = (number: number) =>
  Movie.createQueryBuilder()
    .select()
    .orderBy("RANDOM()")
    .limit(number)
    .getMany();
