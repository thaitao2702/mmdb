import ActorRoleMovie from "entities/ActorRoleMovie";
import { createEntity, updateEntity, deleteEntity } from "utils/entityHandler";
import { asyncCatchErr } from "utils/asyncCatchErr";

export const create = asyncCatchErr(async (req, res) => {
  const actorRoleMovie = await createEntity(ActorRoleMovie, req.body);
  res.status(200).send({ actorRoleMovie });
});

export const update = asyncCatchErr(async (req, res) => {
  const actorRoleMovie = await updateEntity(
    ActorRoleMovie,
    req.params.movieId,
    req.body
  );
  res.status(200).send({ actorRoleMovie });
});

export const remove = asyncCatchErr(async (req, res) => {
  const actorRoleMovie = await deleteEntity(ActorRoleMovie, req.params.movieId);
  res.status(200).send({ actorRoleMovie });
});

export const createActorRoleMovieList = async (
  list: ActorRoleMovie[] = [],
  movieId?: number,
  actorId?: number
) => {
  list
    .map((actorRoleMovie) => ({
      ...actorRoleMovie,
      movieId: movieId ? movieId : actorRoleMovie.movieId,
      actorId: actorId ? actorId : actorRoleMovie.actorId,
    }))
    .map((actorRoleMovie) => createEntity(ActorRoleMovie, actorRoleMovie));
  return Promise.all(list);
};

export const updateList = (
  oldList: ActorRoleMovie[],
  newList: Partial<ActorRoleMovie>[]
) => {
  const oldIds = oldList.map((item) => item.id);
  const newIds = newList.map((item) => item.id || "");
  const deleteIds = oldIds.reduce((prev, current) => {
    if (newIds.indexOf(current) == -1) {
      prev.push(current);
    }
    return prev;
  }, [] as number[]);

  const deleteRoleMovieList = deleteIds.map((id) => {
    return deleteEntity(ActorRoleMovie, id);
  });

  const actorRoleMovieList = newList.map(async (actorRoleMovie) => {
    if (actorRoleMovie.id) {
      return updateEntity(ActorRoleMovie, actorRoleMovie.id, actorRoleMovie);
    } else {
      return createEntity(ActorRoleMovie, actorRoleMovie);
    }
  });

  return Promise.all([...actorRoleMovieList, ...deleteRoleMovieList]);
};
