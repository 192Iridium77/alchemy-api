"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
const lodash_1 = require("lodash");
const auth_middleware_1 = require("../auth/auth.middleware");
const db_1 = __importDefault(require("../db"));
router.get("/", auth_middleware_1.authenticateToken, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = req;
        const matchedUsers = yield db_1.default.select().where({ id: user.id }).from("users");
        const loggedInUser = matchedUsers.length === 1 ? matchedUsers[0] : undefined;
        if (!loggedInUser)
            return res.sendStatus(401);
        if (loggedInUser.role !== "admin")
            return res.send([loggedInUser]);
        const users = yield db_1.default.select().from("users");
        return res.status(200).json((0, lodash_1.omit)(users, "password"));
    });
});
exports.default = router;
//# sourceMappingURL=users.router.js.map