var express = require("express");
var router = express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authenticateToken } from "../auth/auth.middleware";
import { omit } from "lodash";
import UserModel from "../user/user.model";
import userModel from "../user/user.model";

router.post("/login", async function (req, res, next) {
  const {
    body: { username, password },
  } = req;

  if (!username) return res.status(401).send("Username is required");
  if (!password) return res.status(401).send("Password is required");

  const user = await UserModel.find({ username });
  if (!user) return res.sendStatus(401);

  try {
    const correctPassword = await bcrypt.compare(password, user.password);

    if (correctPassword) {
      const accessToken = jwt.sign(
        omit(user, password),
        process.env.JWT_SECRET
      );

      return res.json({ accessToken, status: 200 });
    } else {
      return res.sendStatus(401);
    }
  } catch {
    return res.sendStatus(500);
  }
});

router.post("/signup", async function (req, res, next) {
  const {
    body: { username, password },
  } = req;

  if (!username) return res.status(401).send("Username is required");
  if (!password) return res.status(401).send("Password is required");

  await UserModel.create({ username, password });
});

export default router;
