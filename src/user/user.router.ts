import express, { Request } from "express";
import { authenticateToken } from "../auth/auth.middleware";
import { getUser } from "./user.controller";

const router = express.Router();

router.get("/:id", authenticateToken, async function (req: any, res, next) {
  const { user, params } = req;

  if (!params.id) res.sendStatus(404);

  const data = await getUser({ user }, { id: params.id });

  res.status(200).json(data);
});

export default router;
