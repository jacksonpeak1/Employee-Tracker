const connection = require("./connection");

class DB {
  // Keeping a refernce to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }

  viewAllEmployees2() {
    return this.connection.query("SELECT * FROM employee");
    // return ("This should return all employ");
  }
  viewAllRoles2() {
    return this.connection.query("SELECT * FROM role")
  }
  createEmployee2(newEmployee) {
    return this.connection.query("INSERT INTO employee SET ?", newEmployee)
  }
}



module.exports = new DB(connection);
