"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const knexfile = require("../../knexfile.js");
const knex_1 = require("knex");
const knexInstance = (0, knex_1.knex)(knexfile[process.env.NODE_ENV]);
exports.config = {
    timeout: 10000,
};
exports.default = knexInstance;
//# sourceMappingURL=db.js.map