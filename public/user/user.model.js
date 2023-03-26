"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importStar(require("../db"));
const table = {
    name: "users",
};
const availableFields = ["id", "role", "createdAt", "updatedAt"];
const query = db_1.default.from(table.name);
const create = (props) => {
    delete props.id;
    return db_1.default
        .insert(props)
        .returning(availableFields)
        .into(table.name)
        .timeout(db_1.config.timeout);
};
const findAll = () => {
    return db_1.default.select(availableFields).from(table.name).timeout(db_1.config.timeout);
};
const find = (filters) => {
    return db_1.default
        .select(availableFields)
        .from(table.name)
        .where(filters)
        .timeout(db_1.config.timeout);
};
const update = (id, props) => {
    delete props.id;
    return db_1.default
        .update(props)
        .from(table.name)
        .where({
        id,
    })
        .returning(availableFields)
        .timeout(db_1.config.timeout);
};
const destroy = (id) => {
    return db_1.default
        .del()
        .from(table.name)
        .where({
        id,
    })
        .timeout(db_1.config.timeout);
};
exports.default = {
    query,
    table,
    availableFields,
    create,
    findAll,
    find,
    update,
    destroy,
};
//# sourceMappingURL=user.model.js.map