const util = require("util");
const mysql = require("mysql");

// creates connection to sql database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password:"Dolphin874!",
    database: "employees"
});

connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    // console.log("connected as id " + connection.threadId);
  });

// Setting up connection.query to use promies instead of callbacks
// This allows us to use teh async/await syntax
connection.query = util.promisify(connection.query);

module.exports = connection;