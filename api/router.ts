import express from "express";
import authRouter from "./auth/auth.router";
import usersRouter from "./user/user.router";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);

export default router;
