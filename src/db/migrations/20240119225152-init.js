'use strict';
const { USER_TABLE, UserSchema } = require('../models/user');
const { ROLE_TABLE, RoleSchema } = require('../models/role')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(ROLE_TABLE, RoleSchema);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(ROLE_TABLE);
  }
}