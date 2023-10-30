/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const tableExist = await knex.schema.hasTable('MarketProduct_tbl');
  if (!tableExist) return knex.schema.createTable('MarketProduct_tbl', table => {
    table.integer('market_id').unsigned().index();
    table.integer('product_id').unsigned().index();
    table.integer('price');
    table.string('unit1');
    table.string('unit2');
    table.primary(['market_id', 'product_id']);
    table.foreign('market_id').references('Market_tbl.id').onDelete('CASCADE');
    table.foreign('product_id').references('Product_tbl.id').onDelete('CASCADE');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTableIfExists('MarketProduct_tbl');
};
