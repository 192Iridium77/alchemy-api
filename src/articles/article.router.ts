import express from "express";
import { authenticateToken } from "../auth/auth.middleware";
import { createArticle, getArticle, getArticles } from "./article.controller";
import { createArticleSchema } from "./article.schema";
const router = express.Router();

router.post("/create", authenticateToken, async function (req: any, res, next) {
  const { user, body } = req;

  const { error } = createArticleSchema.validate(body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const data = await createArticle({ user }, body);

  res.status(200).json(data);
});

router.get("/:id", authenticateToken, async function (req: any, res, next) {
  const { user, params } = req;

  if (!params.id) res.sendStatus(404);

  const data = await getArticle({ user }, { id: params.id });

  res.status(200).json(data);
});

router.get("/", authenticateToken, async function (req: any, res, next) {
  const { user, params } = req;

  if (!params.id) res.sendStatus(404);

  const data = await getArticles({ user }, { id: params.id });

  res.status(200).json(data);
});

export default router;
