import jwt from "jsonwebtoken";
import { createLogger } from "../services/logger/logger";
import UserModel from "../user/user.model";
import { UserRole } from "../user/user.types";

const logger = createLogger("Auth");

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    logger.warn("Unauthorized");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      logger.warn("Forbidden");
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}

export async function isAdmin(req, res) {
  const { user } = req;

  const loggedInUser = await UserModel.find({ id: user.id });

  if (!loggedInUser) {
    res.sendStatus(401);
  }

  if (loggedInUser.role !== UserRole.ADMIN) {
    res.sendStatus(403);
  }
}
