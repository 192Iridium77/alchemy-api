var express = require("express");
var router = express.Router();
import { authenticateToken } from "../auth/auth.middleware";
import { getUsers } from "./user.service";

router.get("/", authenticateToken, async function (req, res, next) {
  const { user } = req;

  const users = getUsers({ user }, {});

  return res.status(200).json(users);
});

export default router;
