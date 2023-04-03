/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("article_markdownComponent", function (table) {
    table.uuid("id");
    table
      .uuid("articleId")
      .references("id")
      .inTable("articles")
      .onDelete("CASCADE");
    table
      .uuid("componentId")
      .references("id")
      .inTable("markdownComponents")
      .onDelete("CASCADE");
    table.integer("componentOrder").unsigned().notNullable();
    table.timestamps();
    table.primary(["articleId", "componentOrder"]);
    table.unique(["articleId", "componentOrder"]);
    knex.raw(`
      CONSTRAINT component_order_in_sequence CHECK (
        componentOrder = 1 OR componentOrder = (
            SELECT MAX(componentOrder) + 1 FROM article_markdownComponent AS amc 
            WHERE amc.articleId = article_markdownComponent.articleId 
            AND amc.componentOrder < article_markdownComponent.componentOrder
        )
      )
    `);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("article_markdownComponent");
};
