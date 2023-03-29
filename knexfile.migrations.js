const dotenv = require("dotenv");
dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: "alchemy",
    },
  },
  production: {
    client: "cockroachdb",
    connection: process.env.DB_CONNECTION_STRING,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      disableTransactions: true,
      tableName: "knex_migrations",
    },
  },
};
