import dotenv  from 'dotenv';
import { Dialect } from 'sequelize';
dotenv.config();

export const Config={
  dbname:process.env.POSTGRES_DB || '',
  dbuser:process.env.POSTGRES_USER || '',
  dbpassword:process.env.POSTGRES_PASSWORD,
  host:process.env.HOST,
  port:process.env.PORT,
  dialect:process.env.DIALECT as Dialect,
  serverport:process.env.SERVER_PORT,
  jwtsecret:process.env.JWT_SECRET || '',
  jwtpassword:process.env.JWT_PASSWORD || '',

};