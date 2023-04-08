import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { loggerMiddleware } from "./services/logger/logger";

import router from "./router";
import errorMiddleware from "./services/error/error.middleware";

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://alchemy-tech.com"
        : "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(loggerMiddleware);

app.use("/health", (req, res) => {
  res.sendStatus(200);
});

app.use("/", router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(errorMiddleware);

export default app;
