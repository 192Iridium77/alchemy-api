var express = require("express");
var router = express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { omit } from "lodash";
import UserModel from "../user/user.model";
import { createLogger } from "../services/logger/logger";

const logger = createLogger("AuthRouter");

router.post("/login", async function (req, res, next) {
  const {
    body: { username, password },
  } = req;

  if (!username) {
    logger.warn("Username is required");
    return res.status(401).send("Username is required");
  }
  if (!password) {
    logger.warn("Password is required");
    return res.status(401).send("Password is required");
  }

  const user = await UserModel.find({ username });
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
    body: { username, password },
  } = req;

  if (!username) {
    const message = "Username is required";
    logger;
    return res.status(401).send(message);
  }
  if (!password) return res.status(401).send("Password is required");

  const user = await UserModel.create({ username, password });

  res.send(user);
});

export default router;
