// add required const.
const fs = require("fs");
const generateHTML = require("./generateHTML");// needs {color:}
console.log("x",generateHTML)
const inquirer = require("inquirer");
const path = require("path");
const open = require("open");//look into




// const questions = [
  
// ];

function writeToFile(fileName, data) {
 
}

function init() {
inquirer.prompt([
    {message: 'What is your github user name?', 
    type: 'input',
    name: 'username'},
    {
    type: "list",
    name: "color",
    message: "What Color would you like?",
    choices: ["red", "blue", "green", "pink"]
    }
    ])
.then(ans=>console.log(ans))


};
    
init();
