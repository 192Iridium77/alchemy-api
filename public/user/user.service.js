"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const getUsers = (context, filters) => {
    // todo authorisation
    // todo filters
    return user_model_1.default.findAll();
};
exports.getUsers = getUsers;
//# sourceMappingURL=user.service.js.map