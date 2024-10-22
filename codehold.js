//migrations file

exports.up = knex => {
    return knex.schema.createTable('users', t => {
      t.increments('id').primary().unsigned()
      t.string('username').unique().index()
      t.string('password')
      t.string('email').unique().index()
      t.timestamp('created_at').defaultTo(knex.fn.now())
      t.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  }
  
  exports.down = knex => {
    return knex.schema.dropTable('users')
  }


  exports.up = knex => {
    return knex.schema.createTable('projects', t => {
      t.increments('id').primary().unsigned()
      t.integer('user_id').references('users.id').unsigned().index().onDelete('CASCADE')
      t.string('name')
      t.text('description')
      t.timestamp('completed_at')
      t.timestamp('created_at').defaultTo(knex.fn.now())
      t.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  }
  
  exports.down = knex => {
    return knex.schema.dropTable('projects')
  }


//seed files

'use strict'

const { User } = require('../../server/models')

exports.seed = knex => knex(User.tableName).del()
  .then(() => [
    {
      username: 'admin',
      password: 'password',
      email: 'admin@email.com'
    },
    {
      username: 'first-user',
      password: 'another-password',
      email: 'first-user@email.com'
    }
  ])
  .then(newUsers => Promise.all(newUsers.map(user => User.create(user))))
  .catch(err => console.log('err: ', err))
  

  //////////////

  
'use strict'


const { User, Project } = require('../../server/models')

exports.seed = knex => knex(Project.tableName).del()
  .then(() => User.findAll())
  .then(users => {
    if (users.length <= 0) throw 'No users found'

    return users[0].id
  })
  .then(userId => [
    {
      user_id: userId,
      name: 'Sample Project',
      description: 'This is just a sample project to create some data to look at.'
    },
    {
      user_id: userId,
      name: 'Another Project',
      description: 'This is another project of sample data.',
      completed_at: knex.fn.now()
    }
  ])
  .then(newProjects => Promise.all(newProjects.map(project => Project.create(project))))
  .catch(err => console.log('err: ', err))



  /// error file
  
  const createError = ({
    status = 500,
    message = 'Something went wrong'
  }) => {
    const error = new Error(message)
    error.status = status
  
    return error
  }
  
  module.exports = {
    createError,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    CONFLICT: 409,
    NOT_FOUND: 404,
    UNPROCESSABLE: 422,
    GENERIC_ERROR: 500
  }

  /**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.renameTable('MarketProduct_tbl', 'MarketProduce_tbl');
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function(knex) {
  return knex.schema.renameTable('MarketProduce_tbl', 'MarketProduct_tbl');

};

///
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
  return knex.schema.table('MarketProduce_tbl', table => {
    table.renameColumn('product_id', 'produce_id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('MarketProduce_tbl', table => {
    table.renameColumn('produce_id', 'product_id')
  })
};

exports.up = function(knex) {
return knex.schema.table('MarketProduce_tbl', table => {
  table.dropForeign(['product_id']);
  table.foreign('produce_id').references('Produce_tbl.id').inTable('Produce_tbl');
});
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function(knex) {
return knex.schema.table('MarketProduce_tbl', table => {
  table.dropForeign(['produce_id']);
  table.foreign('product_id').references('Produce_tbl.id').inTable('Produce_tbl')
})
};


////
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


exports.up = async function(knex) {
  return knex.schema.table('MarketProduct_tbl', table => {
      table.string('unit2').defaultTo(null);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  return knex.schema.table('MarketProduct_tbl', table => {
    table.dropColumn('unit2');
  })
};

exports.up = async function(knex) {
  return knex.schema.alterTable('MarketProduct_tbl', table => {
    table.renameColumn('product_id', 'produce_id');
    table.renameColumn('unit', 'unit1');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  return knex.schema.table('MarketProduct_tbl', table => {
    table.renameColumn('produce_id', 'product_id')
  })
};

exports.up = async function(knex) {
return knex.schema.alterTable('MarketProduct_tbl', table => {
  table.dropForeign(['product_id']);
  table.foreign('produce_id').references('Produce_tbl.id').onDelete('CASCADE');
});
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function(knex) {
return knex.schema.table('MarketProduct_tbl', table => {
  table.dropForeign(['produce_id']);
  table.foreign('product_id').references('Produce_tbl.id').onDelete('CASCADE')
})
};
