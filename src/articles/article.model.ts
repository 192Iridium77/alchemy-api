import db, { config } from "../services/db/db";
import { Article } from "./article.types";
import { v4 as uuid } from "uuid";

const table = {
  name: "articles",
};

const availableFields = ["id", "role", "created_at", "updated_at", "password"];

const query = db.from(table.name);

const create = async ({
  title,
  slug,
  draft,
  description,
}: Partial<Article>) => {
  return db(table.name)
    .insert({ id: uuid(), title, slug, draft, description })
    .timeout(config.timeout);
};

const findAll = async (): Promise<Article[]> => {
  return db.select(availableFields).from(table.name).timeout(config.timeout);
};

const find = async (filters): Promise<Article> => {
  return db
    .select<Article>(availableFields)
    .from(table.name)
    .where(filters)
    .first()
    .timeout(config.timeout);
};

const update = async (id, props) => {
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
