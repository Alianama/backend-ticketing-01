const mysql = require("mysql");
require("dotenv").config(); // Memuat konfigurasi dari file .env

const database = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const connection = mysql.createConnection(database);
module.exports = connection;
