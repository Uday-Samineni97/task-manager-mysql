require('dotenv').config(); // include .env file

// DB_PORT,DB_HOST .... are configured in .env file
const development = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
};

const testing = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
};

const production = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
};

module.exports = {
  development,
  testing,
  production,
};
