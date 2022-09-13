import { sortBy, last,  shuffle } from "lodash";

import { Movie,  Actor } from "entities";
import { dataType } from "const";
import { asyncCatchErr } from "utils/asyncCatchErr";

export const findAll = asyncCatchErr(async (req, res) => {
  const { searchValue } = req.query;

  let actorWhereSQL = "actor.name ILIKE :searchValue";

  const actors = await Actor.createQueryBuilder("actor")
    .select()
    .leftJoinAndSelect("actor.movies", "actorRoleMovie")
    .leftJoinAndSelect("actorRoleMovie.movie", "movie")
    .where(actorWhereSQL, { searchValue: `%${searchValue}%` })
    .take(10)
    .getMany();

  const processedActors = actors.map((actor) => ({
    ...actor,
    dataType: dataType.ACTOR,
    mostPopularMovie: (
      last(sortBy(actor.movies, [(movie) => movie.movie.numberOfVotes])) || {
        movie: null,
      }
    ).movie,
  }));

  let movieWhereSQL = "movie.title ILIKE :searchValue";

  const movies = await Movie.createQueryBuilder("movie")
    .select()
    .leftJoinAndSelect("movie.actors", "actorRoleMovie")
    .leftJoinAndSelect("actorRoleMovie.actor", "actor")
    .where(movieWhereSQL, { searchValue: `%${searchValue}%` })
    .take(10)
    .getMany();

  const processedMovies = movies.map((movie) => ({
    ...movie,
    actors: movie.actors
      .slice(0, 2)
      .map((actorRoleMovie) => actorRoleMovie.actor),
    dataType: dataType.MOVIE,
  }));

  const randomReturnData = shuffle([
    ...processedMovies,
    ...processedActors,
  ]).slice(0, 10);

  res.status(200).send({ success: true, data: randomReturnData });
});
