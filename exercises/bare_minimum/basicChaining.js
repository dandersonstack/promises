/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */


var Promise = require('bluebird');
var promiseConstructor = require('./promiseConstructor.js');
var fs = require('fs');
Promise.promisifyAll(require('fs'));
var promisification = require('./promisification.js');


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
    .then( (data) => {
      promisification.getGitHubProfileAsync(data)
        .then((body)=>{
          console.log(JSON.stringify(body));
          fs.writeFileAsync(writeFilePath, JSON.stringify(body))
            .catch((err) => {
              console.log('Error writing the file: ', err);
            });
        })
        .catch((err) => {
          console.log('Error getting Github Profile: ', err);
        });
    })
    .catch((err) => {
      console.log('Error plucking first line: ', err);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
