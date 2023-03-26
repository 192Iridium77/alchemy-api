import db, { config } from "../db";

const table = {
  name: "users",
};

const availableFields = ["id", "role", "createdAt", "updatedAt"];

const query = db.from(table.name);

const create = (props) => {
  delete props.id;
  return db
    .insert(props)
    .returning(availableFields)
    .into(table.name)
    .timeout(config.timeout);
};

const findAll = () => {
  return db.select(availableFields).from(table.name).timeout(config.timeout);
};

const find = (filters) => {
  return db
    .select(availableFields)
    .from(table.name)
    .where(filters)
    .timeout(config.timeout);
};

const update = (id, props) => {
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

const destroy = (id) => {
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
