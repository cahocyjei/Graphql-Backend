import { Sequelize } from 'sequelize';
import { Config } from '@config/index';

export const sequelize = new Sequelize(Config.dbname,Config.dbuser,Config.dbpassword,{
  dialect:Config.dialect,
  host:Config.host,    
});