import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';
import { initUserModel } from 'models/user';
import { initRoleModel } from 'models/role';
dotenv.config();

const dbConfig = {
  database: process.env.POSTGRES_DB || '',
  username: process.env.POSTGRES_DB_USER || '',
  password: process.env.POSTGRES_DB_PASSWORD || '',
  host: process.env.HOST || '',
  dialect: process.env.DIALECT as Dialect || undefined,
};

export class Connection {
  sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
    });
    initUserModel(this.sequelize);
    initRoleModel(this.sequelize);
  }  

  closeConnection() {
    this.sequelize.close();
  }
}
