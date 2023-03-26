"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex = require("knex")({
    client: "pg",
    version: "8.7.3",
    connection: {
        host: "127.0.0.1",
        port: 5432,
        user: "postgres",
        password: "postgres",
    },
});
exports.default = knex;
//# sourceMappingURL=db.js.map