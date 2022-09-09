const inquirer = require('inquirer');
const colors = require('colors');

const fsm = require('../filswan/fs_mintExport.js');

const questions = [
    { type: 'confirm', name: 'mint', message: 'Mint a new NFT via FilSwan?', default: false }, 
    { type: 'input', name: 'sourcefileuploadid', message: 'Enter the source file upload id', default: 476737,
    when: (answers) => answers.mint === true },
    { type: 'input', name: 'ipfsurl', message: 'Enter the ifps url', default: '',
    when: (answers) => answers.mint === true },
    { type: 'input', name: 'nftname', message: 'Enter the nft name', default: '',
    when: (answers) => answers.mint === true },
    { type: 'input', name: 'nftdescription', message: 'Enter the nft description', default: '',
    when: (answers) => answers.mint === true },
    { type: 'confirm', name: 'assoc', message: 'Associate a DID with the NFT?', default: false,
        when: (answers) => answers.mint === true },
    {type: 'input', name: 'did', message: 'Enter the DID', default: 'DID:ExampleString',
        when: (answers) => answers.assoc === true},
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            console.log('----------------------------');  
            console.log('You have input the following:');
            console.log(colors.grey('Mint NFT: '), answers.mint);
            console.log(colors.grey('Associate DID with NFT: '), answers.assoc); 
            console.log(colors.grey('DID: '), answers.did); 
            console.log('----------------------------');  

            const SOURCE_FILE_UPLOAD_ID = answers.sourcefileuploadid 
            const IPFS_URL = answers.ipfsurl 
            const NFT_NAME = answers.nftname  
            const NFT_DESCRIPTION = answers.nftdescription  

            if (answers.mint){
                if (answers.assoc) {
                    console.log('minting NFT with DID...')
                    fsm.fsmintwithDID(SOURCE_FILE_UPLOAD_ID, IPFS_URL, NFT_NAME, NFT_DESCRIPTION, answers.did);
                } else {
                    console.log('minting NFT without DID...')
                    fsm.fsmint(SOURCE_FILE_UPLOAD_ID, IPFS_URL, NFT_NAME, NFT_DESCRIPTION);
                } 
            }
        });
};
