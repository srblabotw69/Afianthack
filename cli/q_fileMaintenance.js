const inquirer = require('inquirer');
const colors = require('colors');

const fgd = require('../filswan/fs_getfdExport.js');
const fli = require('../filswan/fs_listExport.js');

const questions = [
    { type: 'rawlist', name: 'maintain', message: 'Do you want to ', choices: ['get file details', 'list all files'] },
    { type: 'input', name: 'fileUploadId', message: 'Enter the file upload Id:', default: 476737,
        when: (answers) => answers.maintain === 'get file details'},
    { type: 'input', name: 'dealId', message: 'Enter the deal Id:', default: 87301,
        when: (answers) => answers.maintain === 'get file details'} 
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {

            console.log('----------------------------');  
            console.log('You have input the following:');
            console.log(colors.grey('File Maintenance Selection: '), answers.maintain); 
            console.log('----------------------------');  

            if (answers.maintain == 'get file details') {
                fgd.getFileDetails(answers.fileUploadId, answers.dealId)
            } else {
                fli.flist()
            }
        });
}; 