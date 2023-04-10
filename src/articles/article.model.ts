import db, { config } from "../services/db/db";
import { Article } from "./article.types";
import { v4 as uuid } from "uuid";

const table = {
  name: "articles",
};

const availableFields = [
  "id",
  "question",
  "title",
  "slug",
  "published",
  "description",
  "imageId",
  "author",
  "publishedDate",
];

const query = db.from(table.name);

const create = async ({
  title,
  slug,
  published,
  description,
  author,
  imageId,
}: Partial<Article>) => {
  return db(table.name)
    .insert({
      id: uuid(),
      title,
      slug,
      published,
      description,
      author,
      imageId,
    })
    .timeout(config.timeout);
};

const findAll = async (filters): Promise<Article[]> => {
  return db(table.name)
    .select(availableFields)
    .from(table.name)
    .timeout(config.timeout)
    .where(filters);
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
    .where({ id })
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
