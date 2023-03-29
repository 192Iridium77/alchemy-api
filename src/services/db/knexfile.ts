import * as dotenv from "dotenv";
dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: "postgresql",
    connection: {
      host: "127.0.0.1",
      port: 5432,
      user: "postgres",
      password: "postgres",
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
