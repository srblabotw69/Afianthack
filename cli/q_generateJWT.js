const inquirer = require('inquirer');
const colors = require('colors');
const pad = require('pad');
 
const questions = [
    { type: 'confirm', name: 'jwt', message: 'Do you want to create a JWT? (OrbitDB)', default: false},
    {type: 'input', name: 'didstring', message: 'Enter the DID', default: 'didstring',
        when: (answers) => answers.jwt === true},
    {type: 'input', name: 'tokenstring', message: 'Enter the token', default: 'tokenstring',
        when: (answers) => answers.jwt === true},
];

module.exports = async function () {

    const tok = await import('../orbitdb/appExport.js');
    inquirer
        .prompt(questions)
        .then(function (answers) {
            console.log('----------------------------');  
            console.log('You have input the following:');
            console.log(pad(colors.grey('JSONWebToken: '), 30), answers.jwt);
            console.log('----------------------------');  

            if (answers.jwt){
                console.log("creating JSON Web Token...");
                aync = myfn3 = () => {
                    tok.main(answers.didstring, answers.tokenstring);
                }
                myfn3();
            }
        });
        
    };