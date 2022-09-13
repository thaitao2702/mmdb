import Trailer from "entities/Trailer";
import { findEntities } from "utils/entityHandler";

export const getAll = async () => {
  return await findEntities(Trailer);
};
