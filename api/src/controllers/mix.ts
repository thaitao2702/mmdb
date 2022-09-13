import { Movie, Director, Actor } from "entities";
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

export const findAll = asyncCatchErr(async (req, res) => {
  const { searchValue } = req.query;
  console.log("searchValue", searchValue);

  let actorWhereSQL = "actor.name ILIKE :searchValue";

  const actors = await Actor.createQueryBuilder("actor")
    .select()
    .leftJoinAndSelect("actor.movies", "movie")
    .where(actorWhereSQL, { searchValue: `%${searchValue}%` })
    .take(10)
    .getMany();

  let movieWhereSQL = "movie.title ILIKE :searchValue";

  const movies = await Movie.createQueryBuilder("movie")
    .select()
    .leftJoinAndSelect("movie.actors", "actor")
    .where(movieWhereSQL, { searchValue: `%${searchValue}%` })
    .take(10)
    .getMany();

  res.status(200).send({ success: true, data: { actors, movies } });
});
