/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
  await knex.schema.createTable("articles", function (table) {
    table.uuid("id", { primaryKey: true });
    table.string("title");
    table.string("slug").unique();
    table.boolean("draft").defaultTo(false);
    table.string("description");
    table.string("imageId");
    table.string("author");
    table.date("publishedDate"); // 'YYYY-MM-DD'
    table.timestamps();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("articles");
};
