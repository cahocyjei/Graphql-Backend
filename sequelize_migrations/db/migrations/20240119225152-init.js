'use strict';
const { USER_TABLE, UserSchema } = require('../models/user');
const { ROLE_TABLE, RoleSchema } = require('../models/role');
const { USER_ROLE_TABLE, UserRoleSchema } = require('../models/userRole');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(ROLE_TABLE, RoleSchema);
    await queryInterface.bulkInsert(ROLE_TABLE, [
      {
        name: 'ADMIN',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'USER',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'MODERATOR',
        created_at: new Date(),
        updated_at:new Date(),
      },
    ]);
    await queryInterface.createTable(USER_ROLE_TABLE, UserRoleSchema);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_ROLE_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(ROLE_TABLE);
  }
}