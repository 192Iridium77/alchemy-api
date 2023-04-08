import db, { config } from "../services/db/db";
import { Image } from "./image.types";
import { v4 as uuid } from "uuid";

const table = {
  name: "images",
};

const availableFields = [
  "id",
  "url",
  "alt",
  "caption",
  "width",
  "height",
  "ownerId",
];

const query = db.from(table.name);

const create = async (params: Omit<Image, "id">) => {
  return db(table.name)
    .insert({ id: uuid(), ...params })
    .timeout(config.timeout);
};

const findAll = async (filters): Promise<Image[]> => {
  return db
    .select(availableFields)
    .from(table.name)
    .timeout(config.timeout)
    .where(filters);
};

const find = async (filters): Promise<Image> => {
  return db
    .select<Image>(availableFields)
    .from(table.name)
    .where(filters)
    .first()
    .timeout(config.timeout);
};

const update = async (id, props) => {
  delete props.id;

  return db
    .update(props)
    .from(table.name)
    .where({
      id,
    })
    .returning(availableFields)
    .timeout(config.timeout);
};

const destroy = async (id) => {
  return db
    .del()
    .from(table.name)
    .where({
      id,
    })
    .timeout(config.timeout);
};

export default {
  query,
  table,
  availableFields,
  create,
  findAll,
  find,
  update,
  destroy,
};
