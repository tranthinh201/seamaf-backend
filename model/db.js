const mysql = require("mysql2");

const query = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

module.exports = query.promise();
