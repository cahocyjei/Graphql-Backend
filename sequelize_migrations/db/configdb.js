const config = require('../config');

module.exports = {
  development: {
    url: config.dbUrl,
    logging: false,
  },
  production: {
    url: config.dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    logging: false,
  },
};