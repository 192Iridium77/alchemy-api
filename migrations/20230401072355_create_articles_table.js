exports.up = async function (knex) {
  await knex.schema.createTable("articles", function (table) {
    table.uuid("id", { primaryKey: true });
    table.string("title");
    table.string("question");
    table.string("slug").unique().notNullable();
    table.boolean("draft").defaultTo(false);
    table.string("description");
    table.uuid("imageId").references("id").inTable("images");
    table.string("author");
    table.date("publishedDate"); // 'YYYY-MM-DD'
    table.timestamps(true, true);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("articles");
};
