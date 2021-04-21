const connection = require("./connection");

class DB {
  // Keeping a refernce to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }

  viewAllEmployees2() {
    return this.connection.query(`
    SELECT
      employee.id,
        employee.first_name,
        employee.last_name,
        role.title,
        department.name AS department,
        role.salary,
        CONCAT(manager.first_name," ",manager.last_name) AS manager
    FROM 
      employee
        LEFT JOIN role on employee.role_id = role.id
        LEFT JOIN department on role.department_id = department.id
            LEFT JOIN employee manager on manager.id = employee.manager_id;
    `);
    // return ("This should return all employ");
  }
  viewAllRoles2() {
    return this.connection.query("SELECT * FROM role");
  }

  viewAllDepartment2() {
    return this.connection.query("SELECT * FROM department");
  }

  createEmployee2(newEmployee) {
    return this.connection.query("INSERT INTO employee SET ?", newEmployee);
  }

  updateEmployeeRole2(Eid, Rid) {
    return this.connection.query(
      `
    UPDATE employee SET role_id = ${Rid} WHERE id = ${Eid}
    `,
      newEmployee
    );
  }
}

module.exports = new DB(connection);
