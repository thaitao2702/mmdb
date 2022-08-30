import express from "express";

import { getAll, getByName } from "controllers/actors";

const actorsRouter = express.Router();

actorsRouter.get("/", getAll);

actorsRouter.get("/getByName", getByName);

export default actorsRouter;
