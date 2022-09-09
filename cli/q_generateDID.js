const inquirer = require('inquirer');
const colors = require('colors');

const did = require('../ion/didExport.js');
 
const questions = [
    { type: 'confirm', name: 'did', message: 'Generate a new DID?', default: false },
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            console.log('----------------------------');  
            console.log('You have input the following:');
            console.log(colors.grey('Your new DID is: '), answers.did);
            console.log('----------------------------');  

            if (answers.did){
                console.log("creating a new DID...");
                did.createDID();
            }
        });
        
    };