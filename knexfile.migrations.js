const dotenv = require("dotenv");
dotenv.config();

const connection = process.env.DB_CONNECTION_STRING || {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
console.log("🚀 ~ file: knexfile.migrations.js:5 ~ connection:", connection);

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection,
  },
  production: {
    client: "cockroachdb",
    connection,
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
