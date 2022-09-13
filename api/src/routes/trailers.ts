import express from "express";

import { getAll } from "controllers/trailer";

const trailerRouter = express.Router();

trailerRouter.get("/", getAll);

export default trailerRouter;
