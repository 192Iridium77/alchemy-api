import jwt from "jsonwebtoken";
import db from "../db";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

export async function isAdmin(req, res) {
  const { user } = req;

  const matchedUsers = await db.select().where({ id: user.id }).from("users");
  const loggedInUser = matchedUsers.length === 1 ? matchedUsers[0] : undefined;

  if (!loggedInUser) return res.sendStatus(401);
  if (loggedInUser.role !== "admin") return res.sendStatus(403);
}
