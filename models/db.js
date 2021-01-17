const mysql = require("mysql");

var connection = mysql.createPool({
  host: process.env.DB_MYSQL_HOST,
  user: process.env.DB_MYSQL_USER,
  password: process.env.DB_MYSQL_PASSWORD,
  database: process.env.DB_MYSQL_NAME
});

module.exports = connection;
