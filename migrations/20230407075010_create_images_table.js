exports.up = function (knex) {
  return knex.schema.createTable("images", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("url");
    table.string("alt");
    table.string("caption");
    table.integer("width");
    table.integer("height");
    table.uuid("ownerId").references("id").inTable("users");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("images");
};
