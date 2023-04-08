import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { omit } from "lodash";
import UserModel from "../users/user.model";
import { createLogger } from "../services/logger/logger";
import errorHandler from "../services/error/errorHandler";
import { getUserByEmail } from "./auth.controller";

const router = express.Router();

const logger = createLogger("AuthRouter");

router.post("/signup", async function (req, res, next) {
  const {
    body: { email, password },
  } = req;

  if (!email) {
    const message = "Email is required";
    logger;
    return res.status(401).send(message);
  }
  if (!password) return res.status(401).send("Password is required");

  const existing = await UserModel.find({ email });

  if (existing) {
    logger.info({ userId: existing.id, userEmail: existing.email });
    return res.sendStatus(409);
  }

  await UserModel.create({ email, password });
  res.sendStatus(200);
});

router.post("/login", async function (req, res) {
  const {
    body: { email, password },
  } = req;

  if (!email) {
    logger.warn("Email is required");
    return res.status(401).send("Email is required");
  }
  if (!password) {
    logger.warn("Password is required");
    return res.status(401).send("Password is required");
  }

  const user = await getUserByEmail({ email });

  if (!user) {
    logger.warn("Unauthorised");
    return res.sendStatus(401);
  }

  const correctPassword = await bcrypt.compare(password, user.password);

  if (correctPassword) {
    const accessToken = jwt.sign(omit(user, password), process.env.JWT_SECRET);

    return res.json({ userId: user.id, accessToken, status: 200 });
  } else {
    logger.warn("Unauthorised");
    return res.sendStatus(401);
  }
});

export default errorHandler(router);
