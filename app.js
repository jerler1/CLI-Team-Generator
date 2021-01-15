const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const validation = require("./lib/validation");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { Separator } = require("inquirer");
const { sep } = require("path");

// Initializes the program.
function init() {
  let employeeRoster = [];
  makeManager(employeeRoster);
}

// Prompts the user for a manger and information.
// Validation is active for all questions.
// Default values are inputted so that the user can quickly enter values.
function makeManager(employeeRoster) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your managers name?",
        name: "name",
        default: "Susy",
        validate: validation.validLetter,
      },
      {
        type: "input",
        message: "What is your managers id?",
        name: "id",
        default: "100",
        validate: validation.validNumber,
      },
      {
        type: "input",
        message: "What is your managers email?",
        name: "email",
        default: "thebest@around.com",
        validate: validation.validEmail,
      },
      {
        type: "input",
        message: "What is your managers office number?",
        name: "officeNumber",
        default: "5",
        validate: validation.validNumber,
      },
    ])
    // Pushing the manager to the employee roster.
    // After pushing the make employee function is ran.
    .then((response) => {
      const newManager = new Manager(
        response.name,
        response.id,
        response.email,
        response.officeNumber
      );
      employeeRoster.push(newManager);
      makeEmployee(employeeRoster);
    });
}

// Make employee makes either an engineer or intern, or stops the making employee process.

function makeEmployee(employeeRoster) {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What type of employee do you want to add to the team?",
        name: "newEmployeeType",
        choices: [
          new Separator("    "),
          "Intern",
          new Separator("--------"),
          "Engineer",
          new Separator("--------"),
          "I'm done building my team",
          new Separator("   "),
        ],
      },
      {
        type: "input",
        message: "What is your engineer's name?",
        name: "name",
        default: "Steve",
        validate: validation.validLetter,
        when: (choices) => choices.newEmployeeType === "Engineer",
      },
      {
        type: "input",
        message: "What is your engineer's id?",
        name: "id",
        default: "3",
        validate: validation.validNumber,
        when: (choices) => choices.newEmployeeType === "Engineer",
      },
      {
        type: "input",
        message: "What is your engineer's email?",
        name: "email",
        default: "engineer4you@me.com",
        validation: validation.validEmail,
        when: (choices) => choices.newEmployeeType === "Engineer",
      },
      {
        type: "input",
        message: "What is your engineer's github?",
        name: "github",
        default: "DeveloperSteve",
        validate: validation.validLetter,
        when: (choices) => choices.newEmployeeType === "Engineer",
      },
      {
        type: "input",
        message: "What is your intern's name?",
        name: "name",
        default: "Jeff",
        validate: validation.validLetter,
        when: (choices) => choices.newEmployeeType === "Intern",
      },
      {
        type: "input",
        message: "What is your intern's id?",
        name: "id",
        default: "6",
        validate: validation.validNumber,
        when: (choices) => choices.newEmployeeType === "Intern",
      },
      {
        type: "input",
        message: "What is your intern's email?",
        name: "email",
        default: "learning4you@me.com",
        validation: validation.validEmail,
        when: (choices) => choices.newEmployeeType === "Intern",
      },
      {
        type: "input",
        message: "What is your intern's school?",
        name: "school",
        default: "Ga Tech",
        validate: validation.validLetter,
        when: (choices) => choices.newEmployeeType === "Intern",
      },
    ])
    .then(function (response) {
      if (response.newEmployeeType === "I'm done building my team") {
        renderEmployee(employeeRoster);
      } else if (response.newEmployeeType === "Intern") {
        const newIntern = new Intern(
          response.name,
          response.id,
          response.email,
          response.school
        );
        employeeRoster.push(newIntern);
        makeEmployee(employeeRoster);
      } else {
        const newEngineer = new Engineer(
          response.name,
          response.id,
          response.email,
          response.school
        );
        employeeRoster.push(newEngineer);
        makeEmployee(employeeRoster);
      }
    });
}

// Function to render the information into html.
function renderEmployee(employeeRoster) {
  console.log(employeeRoster);
  if (fs.existsSync(outputPath)) {
    fs.writeFileSync(outputPath, render(employeeRoster), (err) => {
      if (err) {
        console.log("There was an error!");
      } else {
        console.log("File was made successfully!");
      }
    });
  } else {
    fs.mkdir(outputPath, (err) => {
      if (err) {
        console.log("There was an error making the folder.");
      } else {
        console.log("Folder was made.");
      }
    });
    fs.writeFileSync(outputPath, render(employeeRoster), (err) => {
      if (err) {
        console.log("There was an error!");
      } else {
        console.log("File was made successfully!");
      }
    });
  }
}

init();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
