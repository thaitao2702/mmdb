import express from "express";
import moviesRouter from "./movies";
import usersRouter from "./users";
import directorsRouter from "./directors";
import actorsRouter from "./actors";
import trailersRouter from "./trailers";
import authenticationRouter from "./authentication";
import homeDataRouter from "./homeData";
import mixDataRouter from "./mix";

import {
  authorizePrivateRoute,
  authorizePublicRoute,
} from "middleware/authToken";

const mainRouter = express.Router();

mainRouter.use("/", (req, res, next) => {
  setTimeout(() => {
    next(); //fake delay
  }, Math.random() * 2000);
});

mainRouter.use("/auth", authenticationRouter);
mainRouter.use("/directors", directorsRouter);
mainRouter.use("/movies", authorizePublicRoute, moviesRouter);
mainRouter.use("/actors", actorsRouter);
mainRouter.use("/trailers", trailersRouter);
mainRouter.use("/user", authorizePrivateRoute, usersRouter);
mainRouter.use("/homeData", authorizePublicRoute, homeDataRouter);
mainRouter.use("/mixData", authorizePublicRoute, mixDataRouter);

export default mainRouter;
