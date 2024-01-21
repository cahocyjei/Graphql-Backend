require('dotenv').config();

 const config = {
  env: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',
  dbUrl: process.env.DATABASE_URL,
}
module.exports = config;