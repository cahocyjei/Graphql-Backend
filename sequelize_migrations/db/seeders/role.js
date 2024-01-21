const { ROLE_TABLE } = require('../models/role');

module.exports = {
  up: async (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    await queryInterface.bulkInsert(ROLE_TABLE, [
      {
        name: 'ADMIN',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'USER',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'MODERATOR',
        created_at: new Date(),
        updated_at:new Date()
      },
    ]);
  },
  down: async (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    await queryInterface.bulkDelete(ROLE_TABLE, null, {});
  }
};