import User from 'entities/Movie';
import { createEntity, updateEntity, deleteEntity } from 'utils/entityHandler';
import { asyncCatchErr } from 'utils/asyncCatchErr';

export const create = asyncCatchErr(async (req, res) => {
    const movie = await createEntity(User, req.body);
    res.status(200).send({movie});
})

export const update = asyncCatchErr(async (req, res) => {
    const movie = await updateEntity(User, req.params.movieId, req.body);
    res.status(200).send({movie});
})

export const remove = asyncCatchErr(async (req, res) => {
    const movie = await deleteEntity(User, req.params.movieId);
    res.status(200).send({movie});
})