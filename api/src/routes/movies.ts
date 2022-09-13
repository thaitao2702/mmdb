import express from "express";

import {
  uploadPostImage,
  parsePostFormData,
  handleUpdateFileSuccess,
} from "middleware/fileUpload";
import {
  getAllMovieList,
  getAll,
  getById,
  create,
  update,
  remove,
  updateMoviePosterFile,
  getMoviesByPage,
} from "controllers/movies";

const moviesRouter = express.Router();

moviesRouter.post("/getByPage", getMoviesByPage);
moviesRouter.get("/list", getAllMovieList);
moviesRouter.get("/:movieId", getById);
moviesRouter.delete("/:movieId", remove);
moviesRouter.post(
  "/",
  uploadPostImage,
  parsePostFormData,
  create,
  updateMoviePosterFile,
  handleUpdateFileSuccess
);
moviesRouter.put(
  "/:movieId",
  uploadPostImage,
  parsePostFormData,
  update,
  updateMoviePosterFile,
  handleUpdateFileSuccess
);

export default moviesRouter;
