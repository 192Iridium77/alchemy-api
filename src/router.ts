import express from "express";
import authRouter from "./auth/auth.router";
import userRouter from "./users/user.router";
import articleRouter from "./articles/article.router";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/articles", articleRouter);

export default router;
