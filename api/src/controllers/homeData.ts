import { asyncCatchErr } from "utils/asyncCatchErr";
import { getAllMovieList } from "./movies";
import { getAll as getAllTrailer } from "./trailer";

export const getHomeData = asyncCatchErr(async (req, res, next) => {
  const currentUser = req.currentUser;
  const movies = await getAllMovieList(currentUser);
  const trailers = await getAllTrailer();
  res.status(200).send({
    success: true,
    data: {
      trailers,
      movies,
    },
  });
});
