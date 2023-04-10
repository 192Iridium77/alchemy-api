import express from "express";
import { authenticateToken, isAdmin } from "../auth/auth.middleware";
import {
  createArticle,
  updateArticle,
  getArticle,
  getArticles,
  generateArticleContent,
} from "./article.controller";
import { createArticleSchema } from "./article.schema";
import errorHandler from "../services/error/errorHandler";
import { createLogger } from "../services/logger/logger";

const router = express.Router();
const logger = createLogger("ArticlesRouter");

router.get(
  "/",
  errorHandler(async function (req: any, res, next) {
    const data = await getArticles({ published: true });
    res.status(200).json(data);
  })
);

router.get(
  "/admin",
  [authenticateToken, isAdmin],
  errorHandler(async function (req: any, res, next) {
    const data = await getArticles();
    res.status(200).json(data);
  })
);

router.post(
  "/create",
  authenticateToken,
  errorHandler(async function (req: any, res, next) {
    const { user, body } = req;

    const { error } = createArticleSchema.validate(body);

    if (error) {
      logger.warn(
        { user, body, error },
        "A validation error occured while creating an Article."
      );
      return res.status(400).json({ message: error.message });
    }

    const data = await createArticle({ user }, body);

    res.status(200).json(data);
  })
);

router.post(
  "/generate",
  authenticateToken,
  errorHandler(async function (req: any, res, next) {
    const { user, body } = req;

    if (!body.prompt) res.sendStatus(400);

    const data = await generateArticleContent(
      { user },
      { prompt: body.prompt }
    );

    res.status(200).json(data);
  })
);

router.get(
  "/:id",
  errorHandler(async function (req: any, res, next) {
    const { user, params } = req;

    if (!params.id) res.sendStatus(404);

    const data = await getArticle({ user }, { id: params.id });

    res.status(200).json(data);
  })
);

router.post(
  "/:id/update",
  authenticateToken,
  errorHandler(async function (req: any, res) {
    const { user, params, body } = req;

    // todo validate

    if (!params.id) res.sendStatus(404);

    const data = await updateArticle({ user }, params.id, body);

    res.status(200).json(data);
  })
);

router.get(
  "/slug/:slug",
  authenticateToken,
  errorHandler(async function (req: any, res, next) {
    const { user, params } = req;

    if (!params.slug) res.sendStatus(404);

    const data = await getArticle({ user }, { slug: params.slug });

    res.status(200).json(data);
  })
);

export default router;
