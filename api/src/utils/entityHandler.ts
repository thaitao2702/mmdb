import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import { FindManyOptions } from "typeorm/find-options/FindManyOptions";
import { EntityNotFoundError, BadUserInputError } from "errors/customErrors";

import {
  Movie,
  User,
  Actor,
  UserReview,
  MovieDetails,
  ActorRoleMovie,
  Director,
  Trailer,
  MovieRating,
} from "entities";
import { validate } from "utils/validation";
import { BaseEntity, FindOneOptions } from "typeorm";

type EntityConstructor =
  | typeof User
  | typeof Movie
  | typeof Actor
  | typeof UserReview
  | typeof MovieDetails
  | typeof ActorRoleMovie
  | typeof Trailer
  | typeof Director
  | typeof MovieRating;
type EntityInstance =
  | User
  | Movie
  | Actor
  | UserReview
  | MovieDetails
  | ActorRoleMovie
  | Trailer
  | Director
  | MovieRating;

const entities: { [key: string]: EntityConstructor } = {
  User,
  Movie,
  Actor,
  UserReview,
  MovieDetails,
  ActorRoleMovie,
  Director,
  Trailer,
  MovieRating,
};

export const findEntities = async <T extends typeof BaseEntity>(
  Constructor: T,
  options?: FindManyOptions<InstanceType<T>>
): Promise<InstanceType<T>[]> => {
  const instance = await Constructor.find(options);
  if (!instance) {
    throw new EntityNotFoundError(Constructor.name);
  }
  return instance as InstanceType<T>[];
};

export const findEntity = async <T extends typeof BaseEntity>(
  Constructor: T,
  options: FindOneOptions<InstanceType<T>>
): Promise<InstanceType<T> | null> => {
  const instance = await Constructor.findOne(options);
  if (!instance) return null;
  return instance as InstanceType<T>;
};

export const findEntityOrThrow = async <T extends typeof BaseEntity>(
  Constructor: T,
  options: FindOptionsWhere<InstanceType<T>>
): Promise<InstanceType<T>> => {
  const instance = await Constructor.findOneBy(options);
  if (!instance) {
    throw new EntityNotFoundError(Constructor.name);
  }
  return instance as InstanceType<T>;
};

export const findEntityById = async <T extends typeof BaseEntity>(
  Constructor: T,
  id: number | string
): Promise<InstanceType<T>> => {
  const instance = await Constructor.findOneById(id);
  if (!instance) {
    throw new EntityNotFoundError(Constructor.name);
  }
  return instance as InstanceType<T>;
};

export const validateAndSaveEntity = async <T extends EntityInstance>(
  instance: T
): Promise<T> => {
  const Constructor = entities[instance.constructor.name];

  if ("validations" in Constructor) {
    const errorFields = validate(instance, Constructor.validations);

    if (Object.keys(errorFields).length > 0) {
      throw new BadUserInputError({ fields: errorFields });
    }
  }
  return instance.save() as Promise<T>;
};

export const createEntity = async <T extends EntityConstructor>(
  Constructor: T,
  input: Partial<InstanceType<T>>
): Promise<InstanceType<T>> => {
  const instance = Constructor.create(input);
  return validateAndSaveEntity(instance as InstanceType<T>);
};

export const updateEntity = async <T extends EntityConstructor>(
  Constructor: T,
  id: number | string,
  input: Partial<InstanceType<T>>
): Promise<InstanceType<T>> => {
  const instance = await findEntityById(Constructor, id);
  Object.assign(instance, input);
  return validateAndSaveEntity(instance);
};

export const deleteEntity = async <T extends EntityConstructor>(
  Constructor: T,
  id: number | string
): Promise<InstanceType<T>> => {
  const instance = await findEntityById(Constructor, id);
  await instance.remove();
  return instance;
};

export const createListById = <T extends EntityInstance>(list: T[]) =>
  list.reduce((prev, curr) => {
    prev[curr.id] = curr;
    return prev;
  }, {} as { [key: number]: any });

export const createListByMovieId = <T extends MovieRating | ActorRoleMovie>(
  list: T[]
) =>
  list.reduce((prev, curr) => {
    prev[curr.movieId] = curr;
    return prev;
  }, {} as { [key: number]: any });
