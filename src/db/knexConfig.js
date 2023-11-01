// 'use strict'

const knexFile = require('../../knexfile');
const env = process.env.NODE_ENV || 'development';

//initialize knex
const knex = require('knex')(knexFile[env])

module.exports = knex;

