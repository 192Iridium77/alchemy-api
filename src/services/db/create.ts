const dotenv = require("dotenv");
const bunyan = require("bunyan");
import db from "./db";
dotenv.config();

const logger = bunyan.createLogger({ name: "CreateDB" });

(async () => {
  try {
    logger.info(
      {
        environment: process.env.NODE_ENV,
      },
      "Creating database"
    );

    await db.raw("CREATE DATABASE alchemy;");
  } catch (err) {
    if (err.code === "42P04") {
      logger.error({}, "Database already exists");
    } else {
      logger.error(
        { err },
        "An unknown error occured while initialising the db"
      );
    }
  } finally {
    process.exit(0);
  }
})();
