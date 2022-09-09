const inquirer = require('inquirer');
const colors = require('colors');
const pad = require('pad');
 
const enc = require('../encrypt/appExport.js');
const fsu = require('../filswan/fs_uploadExport.js');

const path = require('path');
 
const questions = [
    { type: 'input', name: 'filename', message: 'Enter the filename:', default: "testfile.txt"},
    { type: 'confirm', name: 'jwt', message: 'Do you want to create a JWT? (OrbitDB)', default: false},
    {type: 'input', name: 'didstring', message: 'Enter the DID', default: 'didstring',
        when: (answers) => answers.jwt === true},
    {type: 'input', name: 'tokenstring', message: 'Enter the token', default: 'tokenstring',
        when: (answers) => answers.jwt === true},
    { type: 'confirm', name: 'encryption', message: 'Do you want your file to be encrypted?', default: false },
    { type: 'confirm', name: 'storage', message: 'Do you want to pay for data storage? (FilSwan)', default: false },
    { type: 'confirm', name: 'nft', message: 'Do you want to mint an NFT with your file? (FilSwan)', default: false },
];

module.exports = async function () {

    const tok = await import('../orbitdb/appExport.js');
    inquirer
        .prompt(questions)
        .then(async function (answers) { 
            console.log('----------------------------');  
            console.log('You have input the following:');
            console.log(pad(colors.grey('Filename: '), 30), answers.filename);
            console.log(pad(colors.grey('JSONWebToken: '), 30), answers.jwt);
            console.log(pad(colors.grey('Encryption: '), 30), answers.encryption);
            console.log(pad(colors.grey('Persistent Storage: '), 30), answers.storage);
            console.log(pad(colors.grey('Mint NFT: '), 30), answers.nft);
            console.log('----------------------------');  

            var filename_noExt = path.parse(answers.filename).name; 
            var uploadResponse = ''

            if (answers.jwt){
                console.log("creating JSON Web Token...");
                aync = myfn3 = () => {
                    tok.main(answers.didstring, answers.tokenstring);
                }
                myfn3();
            }

            if (answers.encryption){
                console.log("encrypting file " + answers.filename + ' ...');
                await enc.encrypt(answers.filename);
                const encryptedFilename = filename_noExt + '.enc'
                
                console.log("uploading file with encryption " + encryptedFilename + '...')
                uploadResponse = await fsu.fsupload(encryptedFilename, process.env.TESTFILE_DIR);
                
            } else {
                console.log("uploading file " + answers.filename + '...');
                uploadResponse = await fsu.fsupload(answers.filename, process.env.TESTFILE_DIR);
            }
            
        });
};