// add required const.
const fs = require("fs");
const generateHTML = require("./generateHTML");// module for adding style and {color:}
const inquirer = require("inquirer");
const path = require("path");
const open = require("open");//look into
const converter = require("electron-html-to");
const githubApi = require("./githubApi");
const axios = require("axios");

// Create array for questions and background colors for 'inquirer' package
const questions = [  
    {message: 'What is your github username?', 
    type: 'input',
    name: 'github'},
    {
    type: "list",
    name: "color",
    message: "Choose a background color;",
    choices: ["green", "blue", "pink", "red"]
    }
];
//create an init() function to request github and the color requested from choices made to 'writeToFile'
function init() {
    inquirer.prompt(questions).then(({ github, color }) => {
      console.log("Searching...");

      githubApi
      .getUser(github)
      .then(response =>
        githubApi.getTotalStars(github).then(stars => {
          return generateHTML({
            stars,
            color,
            ...response.data
          });
        })
      )
      .then(html => {
        const conversion = converter({
          converterPath: converter.converters.PDF
        });

        conversion({ html }, function(err, result) {
          if (err) {
            return console.error(err);
          }

          result.stream.pipe(
            fs.createWriteStream(path.join(__dirname, "resume.pdf"))
          );
          conversion.kill();
        });
//
        open(path.join(process.cwd(), "resume.pdf"));
      });
    });
};

init();




// The PDF will be populated with the following:

// * Profile image
// * User name
// * Links to the following:
//   * User location via Google Maps
//   * User GitHub profile
//   * User blog
// * User bio
// * Number of public repositories
// * Number of followers
// * Number of GitHub stars
// * Number of users following


    

