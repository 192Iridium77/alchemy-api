import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { omit } from "lodash";
import UserModel from "../user/user.model";
import { createLogger } from "../services/logger/logger";

const router = express.Router();

const logger = createLogger("AuthRouter");

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

  const user = await UserModel.find({ email });
  if (!user) {
    logger.warn("Unauthorised");
    return res.sendStatus(401);
  }

  try {
    const correctPassword = await bcrypt.compare(password, user.password);

    if (correctPassword) {
      const accessToken = jwt.sign(
        omit(user, password),
        process.env.JWT_SECRET
      );

      return res.json({ accessToken, status: 200 });
    } else {
      logger.warn("Unauthorised");
      return res.sendStatus(401);
    }
  } catch (err) {
    logger.error(
      { message: err.message, stack: err.stack },
      "An unknown error occured"
    );
    return res.sendStatus(500);
  }
});

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

  const existing = UserModel.find({ email });

  if (existing) {
    return res.sendStatus(409);
  }

  try {
    await UserModel.create({ email, password });
    res.sendStatus(200);
  } catch (error) {
    logger.error({ error }, "An unknown Error occured while creating the user");
    res.sendStatus(500);
  }
});

export default router;
