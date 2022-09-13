import { User, MovieRating, Movie } from "entities";
import {
  createEntity,
  updateEntity,
  deleteEntity,
  findEntity,
  validateAndSaveEntity,
  createListById,
  createListByMovieId,
} from "utils/entityHandler";
import { asyncCatchErr } from "utils/asyncCatchErr";
import { EntityNotFoundError, InvalidTokenError } from "errors/customErrors";

export const update = asyncCatchErr(async (req, res) => {
  const user = await updateEntity(User, req.params.userId, req.body);
  res.status(200).send({ user });
});

export const addToWatchList = asyncCatchErr(async (req, res) => {
  const id = req.currentUser.id;
  const { movieId } = req.body;
  const user = await findEntity(User, {
    where: { id },
    relations: { watchList: true },
  });
  if (!user) throw new EntityNotFoundError(User.name);
  const isAlreadyAdded = (user.watchList || []).some(
    (movie) => movie.id === movieId
  );
  if (isAlreadyAdded)
    return res.status(200).send({ success: true, data: user });

  Object.assign(user, {
    watchList: [...(user.watchList || []), { id: movieId }],
  });
  const savedUser = await validateAndSaveEntity(user);
  res.status(200).send({ success: true, data: savedUser });
});

export const removeFromWatchList = asyncCatchErr(async (req, res) => {
  const id = req.currentUser.id;
  const { movieId } = req.body;
  const user = await findEntity(User, {
    where: { id },
    relations: { watchList: true },
  });
  if (!user) throw new EntityNotFoundError(User.name);
  const isAlreadyAdded = (user.watchList || []).some(
    (movie) => movie.id === movieId
  );
  if (!isAlreadyAdded)
    return res.status(200).send({ success: true, data: user });

  Object.assign(user, {
    watchList: user.watchList.filter((movie) => movie.id !== movieId),
  });
  const savedUser = await validateAndSaveEntity(user);
  res.status(200).send({ success: true, data: savedUser });
});

export const voteMovie = asyncCatchErr(async (req, res) => {
  const id = req.currentUser.id;
  const { movieId } = req.body;
  const user = await findEntity(User, {
    where: { id },
    relations: { movieRatings: true },
  });

  if (!user) throw new EntityNotFoundError(User.name);
  const movieRating = (user.movieRatings || []).find(
    (movieRating) => movieRating.movieId === movieId
  );

  if (movieRating) {
    const instance = { ...movieRating, ...req.body, userId: id };
    const updatedMovieRating = await updateEntity(
      MovieRating,
      movieRating.id,
      instance
    );
    res.status(200).send({ success: true, data: updatedMovieRating });
  } else {
    const newMovieRating = await createEntity(MovieRating, {
      ...req.body,
      userId: id,
    });
    res.status(200).send({ success: true, data: newMovieRating });
  }
});

export const unVoteMovie = asyncCatchErr(async (req, res) => {
  const id = req.currentUser.id;
  const { movieId } = req.body;
  const user = await findEntity(User, {
    where: { id },
    relations: { movieRatings: true },
  });

  if (!user) throw new EntityNotFoundError(User.name);
  const movieRating = (user.movieRatings || []).find(
    (movieRating) => movieRating.movieId === movieId
  );

  if (!movieRating) return res.status(200).send({ success: true, data: null });
  const deletedMovieRating = await deleteEntity(MovieRating, movieRating.id);
  res.status(200).send({ success: true, data: deletedMovieRating });
});

export const getByToken = asyncCatchErr(async (req, res) => {
  const currentUser = req.currentUser;
  if (!currentUser) throw new InvalidTokenError();
  const id = currentUser.id;
  const instance = await findEntity(User, {
    where: { id },
    relations: { movieRatings: true, watchList: true },
  });
  if (!instance) throw new EntityNotFoundError(User.name);
  instance.password = "";
  const user = {
    ...instance,
    watchList: createListById(instance.watchList),
    movieRatings: createListByMovieId(instance.movieRatings),
  };

  res.status(200).send({ success: true, data: user });
});

export const getById = asyncCatchErr(async (req, res) => {
  const id = req.params.userId;
  const instance = await findEntity(User, {
    where: { id },
    relations: { movieRatings: true, watchList: true },
  });
  if (!instance) throw new EntityNotFoundError(User.name);
  instance.password = "";
  const user = { ...instance, watchList: createListById(instance.watchList) };

  res.status(200).send({ success: true, data: user });
});
