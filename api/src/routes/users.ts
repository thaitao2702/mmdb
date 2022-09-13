import express from "express";

import {
  getById,
  update,
  getByToken,
  addToWatchList,
  removeFromWatchList,
  voteMovie,
  unVoteMovie,
} from "controllers/users";

const usersRouter = express.Router();

usersRouter.get("/", getByToken);
usersRouter.get("/:userId", getById);
usersRouter.post("/", update);
usersRouter.post("/addToWatchList", addToWatchList);
usersRouter.post("/removeFromWatchList", removeFromWatchList);
usersRouter.post("/vote", voteMovie);
usersRouter.post("/unVote", unVoteMovie);

export default usersRouter;
