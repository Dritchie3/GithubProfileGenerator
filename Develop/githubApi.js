//require axios this is a package to be able to query the github api
const axios = require("axios");
//require dotenv this loads enviroment variables from an .env file into 'process.env'
require("dotenv").config();

const api = {
    getUser(username) {
      // console.log (process.env.CLIENT_ID)
      // console.log (process.env.CLIENT_SECRET)
      return axios
        .get(
          `https://api.github.com/users/${username}?client_id=${
            process.env.CLIENT_ID
          }&client_secret=${process.env.CLIENT_SECRET}`
        )
        // cause error if the axios http request is not returned
        .catch(err => {
          console.log(`User not found`);
          //after catching error exit the process
          process.exit(1);
        });
    },
    //get api data
    getTotalStars(username) {
      return axios
        // get data from URL 
        .get(
          `https://api.github.com/users/${username}/repos?client_id=${
            process.env.CLIENT_ID
          }&client_secret=${process.env.CLIENT_SECRET}&per_page=100`
        )
        .then(response => {
          return response.data.reduce((acc, curr) => {
            // After getting user data, count all their repository stars. use reduce to add all the stars together.
            acc += curr.stargazers_count;
            return acc;
          }, 0);
        });
    }
};

// export module to github api
module.exports = api;