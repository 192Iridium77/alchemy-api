const knexfile = require("../../knexfile.js");

import { knex } from "knex";

const knexInstance = knex(knexfile[process.env.NODE_ENV]);

export const config = {
  timeout: 10000,
};

export default knexInstance;
