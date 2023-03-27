import knexfile from "./knexfile";
import { knex } from "knex";

const knexInstance = knex(knexfile[process.env.NODE_ENV || "development"]);

export const config = {
  timeout: 10000,
};

export default knexInstance;
