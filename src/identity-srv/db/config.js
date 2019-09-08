
module.exports = {
  port: process.env.DATA_BASE_PORT,
  host: process.env.DATA_BASE_HOST,
  database: process.env.DATA_BASE_NAME,
  username: process.env.DATA_BASE_USERNAME,
  password: process.env.DATA_BASE_PASSWORD,
  dialect: 'postgres'
};