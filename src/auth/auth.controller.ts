import knex from "../services/db/db";
import { createLogger } from "../services/logger/logger";

const logger = createLogger("AuthController");

const getUserByEmail = async ({ email }) => {
  try {
    const user = await knex("users")
      .select("id", "email", "password", "role")
      .where({ email })
      .first();

    return user;
  } catch (err) {
    logger.error(err);
  }
};

export { getUserByEmail };
