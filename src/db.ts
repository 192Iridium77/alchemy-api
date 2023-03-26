const knexfile = require("../knexfile.js");

import { knex } from "knex";

console.log("🚀 ~ file: db.ts:6 ~ knexfile:", knexfile);
console.log("🚀 ~ file: db.ts:7 ~ process.env.NODE_ENV:", process.env.NODE_ENV);
const knexInstance = knex(knexfile[process.env.NODE_ENV || "development"]);

export const config = {
  timeout: 10000,
};

export default knexInstance;
