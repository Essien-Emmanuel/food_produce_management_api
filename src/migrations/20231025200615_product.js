/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    const tableExist = await knex.schema.hasTable('Product_tbl');
    if (!tableExist) return knex.schema.createTable('Product_tbl', (table) => {
        table.increments('id').primary().notNullable();
        table.string('producename').notNullable();
        table.integer('status').notNullable();
        table.string('statusname').defaultTo(null);
        table.string('color').notNullable();
        table.text('hexcolor');
        table.string('unit1').defaultTo(null);
        table.string('unit2').defaultTo(null);
        table.decimal('conversionrate', 18, 2).notNullable().defaultTo(0.00)
        table.text('produceimageurl');
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Product_tbl');

};
