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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_middleware_1 = require("../auth/auth.middleware");
const db_1 = __importDefault(require("../db"));
const lodash_1 = require("lodash");
router.post("/login", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body: { username, password }, } = req;
        if (!username)
            return res.status(401).send("Username is required");
        if (!password)
            return res.status(401).send("Password is required");
        const users = yield db_1.default.select().where({ username }).from("users");
        const user = users.length === 1 ? users[0] : undefined;
        if (!user)
            return res.sendStatus(401);
        try {
            const correctPassword = yield bcrypt_1.default.compare(password, user.password);
            if (correctPassword) {
                const accessToken = jsonwebtoken_1.default.sign((0, lodash_1.omit)(user, password), process.env.JWT_SECRET);
                return res.json({ accessToken, status: 200 });
            }
            else {
                return res.sendStatus(401);
            }
        }
        catch (_a) {
            return res.sendStatus(500);
        }
    });
});
router.get("/", auth_middleware_1.authenticateToken, function (req, res, next) {
    res.json({ status: 200 });
});
exports.default = router;
//# sourceMappingURL=auth.router.js.map