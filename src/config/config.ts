
import dotenv from 'dotenv';
import { Dialect } from 'sequelize';
dotenv.config();

const dbConfig = {
  database: process.env.POSTGRES_DB || '',
  username: process.env.POSTGRES_DB_USER || '',
  password: process.env.POSTGRES_DB_PASSWORD || '',
  host: process.env.HOST || '',
  dialect: process.env.DIALECT as Dialect || undefined,
};
export default dbConfig;