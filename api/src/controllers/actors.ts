import Actor from "entities/Actor";
import {
  createEntity,
  updateEntity,
  deleteEntity,
  findEntities,
} from "utils/entityHandler";
import { asyncCatchErr } from "utils/asyncCatchErr";

export const getAll = asyncCatchErr(async (req, res) => {
  const actors = await findEntities(Actor, {
    relations: ["movies"],
    take: 10,
  });
  res.status(200).send({ success: true, data: actors });
});

export const getByName = asyncCatchErr(async (req, res) => {
  const { searchValue } = req.query;

  let whereSQL = "actor.name ILIKE :searchValue";

  const actors = await Actor.createQueryBuilder("actor")
    .select()
    .where(whereSQL, { searchValue: `%${searchValue}%` })
    .take(10)
    .getMany();
  res.status(200).send({ success: true, data: actors });
});

export const create = asyncCatchErr(async (req, res) => {
  const movie = await createEntity(Actor, req.body);
  res.status(200).send({ movie });
});

export const update = asyncCatchErr(async (req, res) => {
  const movie = await updateEntity(Actor, req.params.movieId, req.body);
  res.status(200).send({ movie });
});

export const remove = asyncCatchErr(async (req, res) => {
  const movie = await deleteEntity(Actor, req.params.movieId);
  res.status(200).send({ movie });
});
