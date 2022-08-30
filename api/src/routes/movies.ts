import express from "express";

import {
  uploadPostImage,
  parsePostFormData,
  handleUpdateFileSuccess,
} from "middleware/fileUpload";
import {
  getAll,
  getById,
  create,
  update,
  updateMoviePosterFile,
} from "controllers/movies";

const moviesRouter = express.Router();

moviesRouter.get("/", getAll);
moviesRouter.get("/:movieId", getById);
moviesRouter.post("/", uploadPostImage, parsePostFormData, create);
moviesRouter.put(
  "/:movieId",
  uploadPostImage,
  parsePostFormData,
  update,
  updateMoviePosterFile,
  handleUpdateFileSuccess
);

export default moviesRouter;
