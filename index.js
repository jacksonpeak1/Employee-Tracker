var inquirer = require("inquirer");
var db = require("./db");
require("console.table");
const { listenerCount } = require("./db/connection");

startMainPrompt();
function startMainPrompt() {
  inquirer
    .prompt({
      name: "start",
      type: "list",
      message: "Which would you like to pick?",
      choices: ["View all employees", "Add an employee","View all departments",  "View all Roles", "Update Employee Role"],
    })
    .then((answers) => {
      // Use user feedback for... whatever!!
      if (answers.start === "View all employees") {
        viewAllEmployees1();
      } else if (answers.start === "Add an employee") {
        addAnEmployee1();
      } else if (answers.start === "View all departments") {
        viewAllDepartment1();
      }
      else if (answers.start === "View all Roles") {
        viewAllRoles1();
      }
      else if (answers.start === "Update Employee Role") {
        updateEmployeeRole1();
      }
    });
}

async function viewAllEmployees1() {
  const allEmployees = await db.viewAllEmployees2();
  console.log("\n");
  console.table(allEmployees);
  startMainPrompt();
}

async function viewAllDepartment1() {
  const allDepartment = await db.viewAllDepartment2();
  console.log("\n");
  console.table(allDepartment);
  startMainPrompt();
}

async function viewAllRoles1() {
  const allRoles = await db.viewAllRoles2();
  console.log("\n");
  console.table(allRoles);
  startMainPrompt();
}

async function addAnEmployee1() {
  // Fetch all roles from the db
  // Fetch all employees
  const roles = await db.viewAllRoles2();
  const allEmployees = await db.viewAllEmployees2();

  //create newEmployee object
  const newEmployee = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the new employee's first name?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the employee's last name?",
    },
  ]);

  //ask for role - generates array of objects
  const roleChoices = roles.map((role) => ({
    name: role.title,
    value: role.id,
  }));

  const newEmployeeRoleId = await inquirer.prompt({
    type: "list",
    name: "roleId",
    message: "What is the new employee's role?",
    choices: roleChoices,
  });

  //assign chosen role
  newEmployee.role_id = newEmployeeRoleId.roleId;

  //ask who is the manager
  const managerChoices = allEmployees.map((employee) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));

  const newEmployeesManager = await inquirer.prompt({
    type: "list",
    name: "managerId",
    message: "Who is this employee's manager?",
    choices: managerChoices,
  });

  newEmployee.manager_id = newEmployeesManager.managerId;

  // console.log(newEmployee);
  await db.createEmployee2(newEmployee);
  console.log("success");
  startMainPrompt();
}

async function updateEmployeeRole1() {

  const allRoles = await db.viewAllRoles2();
  const allEmployees = await db.viewAllEmployees2();
  
  const employeeChoices = allEmployees.map((employee) => ({
    name: employee.title,
    value: employee.id,
  }));

  //create newEmployee object
  const newEmployee = await inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What employee do we wanna update?",
      choices: employeeChoices,
    }
  ]);

  //ask for role - generates array of objects
  const roleChoices = allRoles.map((role) => ({
    name: role.title,
    value: role.id,
  }));

  const newEmployeeRoleId = await inquirer.prompt({
    type: "list",
    name: "id",
    message: "What is the employee's role?",
    choices: roleChoices,
  });

  // console.log(newEmployee);
  await db.updateEmployeeRole2(newEmployee.id,newEmployeeRoleId.id);
  console.log("success");
  startMainPrompt();
}


