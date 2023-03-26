"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = exports.authRouter = void 0;
const auth_router_1 = __importDefault(require("./auth/auth.router"));
exports.authRouter = auth_router_1.default;
const users_router_1 = __importDefault(require("./users/users.router"));
exports.usersRouter = users_router_1.default;
//# sourceMappingURL=routes.js.map