import db, { config } from "../services/db/db";
import { User, UserRole } from "./user.types";
import uuid from "uuid";
import bcrypt from "bcrypt";

const table = {
  name: "users",
};

const availableFields = ["id", "role", "createdAt", "updatedAt", "password"];

const query = db.from(table.name);

const create = async ({
  username,
  password,
  role = UserRole.BASIC,
}: Partial<User>) => {
  const salt = await bcrypt.genSalt();
  const encryptedPassword = await bcrypt.hash(password, salt);

  return db
    .insert({ id: uuid.v4(), username, password: encryptedPassword, role })
    .returning(availableFields)
    .into(table.name)
    .timeout(config.timeout);
};

const findAll = async (): Promise<User[]> => {
  return db.select(availableFields).from(table.name).timeout(config.timeout);
};

const find = async (filters): Promise<User> => {
  return db
    .select<User>(availableFields)
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
