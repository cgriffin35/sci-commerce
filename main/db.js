const { Pool } = require("pg");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.NODE_ENV : connectionString,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT,
  // database: process.env.DB_DATABASE,
  // host: process.env.DB_HOST,
  ssl: isProduction,
});

module.exports = { pool };