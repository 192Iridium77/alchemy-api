const dotenv = require("dotenv");
const bunyan = require("bunyan");
dotenv.config();

const logger = bunyan.createLogger({ name: "CreateDB" });

const connection = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

(async () => {
  try {
    logger.info(
      { host: connection.host, user: connection.user },
      "creating database"
    );
    const knex = require("knex")({
      client: "pg",
      connection,
    });

    await knex.raw("CREATE DATABASE alchemy;");
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
