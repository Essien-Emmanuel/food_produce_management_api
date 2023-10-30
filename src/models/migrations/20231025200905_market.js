/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const tableExist = await knex.schema.hasTable('Market_tbl');

  if (!tableExist) return knex.schema.createTable('Market_tbl', table => {
    table.increments('id').notNullable().primary();
    table.string('name', 30).notNullable();
    table.integer('size');
    table.string('type', 20);
    table.string('address', 100);
    table.string('description');
    table.integer('LgaId').unsigned().index();
    table.integer('StateId').unsigned().index();
    table.integer('CountryId').unsigned().index();
    table.timestamps(true, true);
    table.foreign('Market_tbl.LgaId').references('LGA_tbl.id').onDelete('CASCADE');
    table.foreign('Market_tbl.StateId').references('States_tbl.id').onDelete('CASCADE');
    table.foreign('Market_tbl.CountryId').references('Country_tbl.id').onDelete('CASCADE');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTableIfExists('Market_tbl');
};
