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
      message: "Which would you like  to pick?",
      choices: ["View all employees", "Add an employee"],
    })
    .then((answers) => {
      // Use user feedback for... whatever!!
      if (answers.start === "View all employees") {
        viewAllEmployees1();
      }
    });
}

async function viewAllEmployees1() {
  const allEmployees = await db.viewAllEmployees2();
  console.log("\n");
  console.table(allEmployees);
}
