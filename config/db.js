const { Pool } = require("pg");
require("dotenv").config(); // Load environment variables from .env file

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: true,
});

pool.connect((err) => {
  if (err) throw err;
  console.log("Connect to PostgreSQL, succesfully!");
});

module.exports = pool;
