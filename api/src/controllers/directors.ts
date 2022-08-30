import Director from "entities/Director";
import {
  createEntity,
  updateEntity,
  deleteEntity,
  findEntities,
} from "utils/entityHandler";
import { asyncCatchErr } from "utils/asyncCatchErr";

export const getAll = asyncCatchErr(async (req, res) => {
  const directors = await findEntities(Director, {
    relations: ["movies"],
    take: 10,
  });
  res.status(200).send({ success: true, data: directors });
});

export const getByName = asyncCatchErr(async (req, res) => {
  const { searchValue } = req.query;

  let whereSQL = "director.name ILIKE :searchValue";

  const directors = await Director.createQueryBuilder("director")
    .select()
    .where(whereSQL, { searchValue: `%${searchValue}%` })
    .take(10)
    .getMany();
  res.status(200).send({ success: true, data: directors });
});

export const create = asyncCatchErr(async (req, res) => {
  const movie = await createEntity(Director, req.body);
  res.status(200).send({ movie });
});

export const update = asyncCatchErr(async (req, res) => {
  const movie = await updateEntity(Director, req.params.movieId, req.body);
  res.status(200).send({ movie });
});

export const remove = asyncCatchErr(async (req, res) => {
  const movie = await deleteEntity(Director, req.params.movieId);
  res.status(200).send({ movie });
});
