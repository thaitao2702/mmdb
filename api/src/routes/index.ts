import express from "express";
import moviesRouter from "./movies";
import usersRouter from "./users";
import directorsRouter from "./directors";
import actorsRouter from "./actors";
import authenticationRouter from "./authentication";

import { authorizeToken } from "middleware/authToken";

const mainRouter = express.Router();

mainRouter.use("/", (req, res, next) => {
  setTimeout(() => {
    next(); //fake delay
  }, Math.random() * 2000);
});

mainRouter.use("/auth", authenticationRouter);
mainRouter.use("/directors", directorsRouter);
mainRouter.use("/movies", moviesRouter);
mainRouter.use("/actors", actorsRouter);
mainRouter.use("/users", authorizeToken, usersRouter);

export default mainRouter;
