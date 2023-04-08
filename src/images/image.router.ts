import express, { Request } from "express";
import { authenticateToken } from "../auth/auth.middleware";
import { getImage, getImages } from "./image.controller";
import errorHandler from "../services/error/errorHandler";

const router = express.Router();

router.get(
  "/:id",
  authenticateToken,
  errorHandler(async function (req: any, res, next) {
    const { user, params } = req;

    if (!params.id) res.sendStatus(404);

    const data = await getImage({ user }, { id: params.id });

    res.status(200).json(data);
  })
);

router.get(
  "/:ownerId",
  authenticateToken,
  errorHandler(async function (req: any, res, next) {
    const { user, params } = req;

    if (!params.ownerId) res.sendStatus(404);

    const images = await getImages({ user }, { ownerId: params.ownerId });

    res.status(200).json(images);
  })
);

export default router;
