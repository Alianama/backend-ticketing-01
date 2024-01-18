const mysql = require("mysql");

const database = {
  host: "localhost",
  user: "root",
  password: "",
  database: "ticketing_database",
};

const connection = mysql.createConnection(database);
module.exports = connection;
