const { Sequelize } = require('sequelize');
const config   = require('../config/config');
const SetupModels = require('./models/setupModels');

const options = {
  dialect: 'postgres',
  logging: config.isDev ? console.log : false,
}

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

const sequelize = new Sequelize(config.dbUrl, options);
SetupModels(sequelize);
module.exports = sequelize;