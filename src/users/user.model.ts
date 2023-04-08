import db, { config } from "../services/db/db";
import { User, UserRole } from "./user.types";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

const table = {
  name: "users",
};

const availableFields = [
  "id",
  "email",
  "username",
  "role",
  "created_at",
  "updated_at",
  "password",
];

const fieldsWithoutPassword = availableFields.filter(
  (field) => field !== "password"
);

const query = db.from(table.name);

const create = async ({
  email,
  password,
  role = UserRole.BASIC,
}: Partial<User>) => {
  const salt = await bcrypt.genSalt();
  const encryptedPassword = await bcrypt.hash(password, salt);

  return db(table.name)
    .insert({ id: uuid(), email, password: encryptedPassword, role })
    .timeout(config.timeout);
};

const findAll = async (): Promise<User[]> => {
  return db
    .select(fieldsWithoutPassword)
    .from(table.name)
    .timeout(config.timeout);
};

const find = async (filters): Promise<User> => {
  return db
    .select<User>(fieldsWithoutPassword)
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
    .returning(fieldsWithoutPassword)
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
