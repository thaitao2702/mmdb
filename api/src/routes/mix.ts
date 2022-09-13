import express from "express";

import { findAll } from "controllers/mix";

const mixDataRouter = express.Router();

mixDataRouter.get("/", findAll);

export default mixDataRouter;
