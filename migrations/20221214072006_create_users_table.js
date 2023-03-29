/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
  await knex.schema.createTable("users", function (table) {
    table.uuid("id", { primaryKey: true });
    table.string("username");
    table.string("email").unique();
    table.string("password");
    table.string("role");
    table.timestamps();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("users");
};
