"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const knexfile = require("../knexfile.js");
const knex_1 = require("knex");
console.log("🚀 ~ file: db.ts:6 ~ knexfile:", knexfile);
console.log("🚀 ~ file: db.ts:7 ~ process.env.NODE_ENV:", process.env.NODE_ENV);
const knexInstance = (0, knex_1.knex)(knexfile[process.env.NODE_ENV || "development"]);
exports.config = {
    timeout: 10000,
};
exports.default = knexInstance;
//# sourceMappingURL=db.js.map