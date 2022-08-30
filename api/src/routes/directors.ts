import express from "express";

import { getAll, getByName } from "controllers/directors";

const directorRouter = express.Router();

directorRouter.get("/", getAll);

directorRouter.get("/getByName", getByName);

export default directorRouter;
