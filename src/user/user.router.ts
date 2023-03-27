var express = require("express");
var router = express.Router();
import { authenticateToken } from "../auth/auth.middleware";
import { getUsers, getUser } from "./user.controller";

router.get("/", authenticateToken, async function (req, res, next) {
  const { user } = req;

  const users = getUsers({ user }, {});

  return res.status(200).json(users);
});

router.get("/:id", authenticateToken, async function (req, res, next) {
  const { user, params } = req;

  if (!params.id) res.sendStatus(404);

  const users = getUser({ user }, { id: params.id });

  return res.status(200).json(users);
});

export default router;
