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
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
const auth_middleware_1 = require("../auth/auth.middleware");
const user_service_1 = require("./user.service");
router.get("/", auth_middleware_1.authenticateToken, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = req;
        const users = (0, user_service_1.getUsers)({ user }, {});
        return res.status(200).json(users);
    });
});
exports.default = router;
//# sourceMappingURL=user.router.js.map