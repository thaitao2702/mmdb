import "module-alias/register";
import "dotenv/config";

import express from "express";
import cors from "cors";
import path from "path";

import initDatabase from "database/createConnection";
import mainRouter from "routes";
import { initAdmin } from "utils/user";
import { handleErrors } from "middleware/errors";

const initExpress = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());

  app.use(express.static("public"));

  app.use("/api", mainRouter);
  app.use(handleErrors);

  app.listen(process.env.PORT || 3000);
};

const initApp = async () => {
  await initDatabase();
  await initAdmin();
  initExpress();
};

initApp();
