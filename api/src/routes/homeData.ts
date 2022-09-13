import express from "express";

import { getHomeData } from "controllers/homeData";

const homeDataRouter = express.Router();

homeDataRouter.get("/", getHomeData);

export default homeDataRouter;
