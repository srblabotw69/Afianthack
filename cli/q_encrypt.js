const inquirer = require('inquirer');
const colors = require('colors');
const pad = require('pad');

const fs = require('fs')
// const existsSync = rquire('node:fs');

const enc = require('../encrypt/appExport.js');
const { exit } = require('process');
 
const questions = [
    { type: 'rawlist', name: 'encryption', message: 'Do you want to ', choices: ['encrypt file', 'decrypt file'] },
    { type: 'input', name: 'filename', message: 'Enter the filename:', default: "testfile.txt",
        when: (answers) => answers.encryption === 'encrypt file'},
    { type: 'input', name: 'filename', message: 'Enter the encrypted filename:', default: "testfile.enc",
        when: (answers) => answers.encryption === 'decrypt file'}
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {

            const path = (process.env.TESTFILE_DIR + answers.filename)
            if (fs.existsSync(path)) {
                //file exists
                console.log('----------------------------');  
                console.log('You have input the following:');
                // console.log(pad(colors.grey('encrypt file: '), 30), answers.filename);
                console.log(colors.grey('file: '), answers.filename);
                console.log('----------------------------');  
            } else {
                console.error('file does not exist: ' + answers.filename)
                exit()
            }

            if (answers.encryption == 'encrypt file'){
                console.log("encrypting file...");
                enc.encrypt(answers.filename);
        
            } else {
                console.log("decrypting file...");
                enc.decrypt(answers.filename);
            }
        });
}; 