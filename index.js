const program = require('commander');

const encrypt = require('./cli/q_encrypt.js');
const upload = require('./cli/q_upload.js');
const generatedid = require('./cli/q_generateDID.js');
const generatejwt = require('./cli/q_generateJWT.js');
const getServiceEndpoint = require('./cli/q_getServiceEndpoint.js');
const mintNFT = require('./cli/q_mintNFT.js');
const fileMaintenance = require('./cli/q_fileMaintenance.js'); 

program
    .usage('[options]')
    .option('-d, --did', 'generate a new DID (ION)', generatedid)
    .option('-u, --upload', 'upload to service endpoint (FilSwan)', upload)
    .option('-e, --encrypt', 'encrypt or decrypt file', encrypt)
    .option('-j, --jwt', 'generate a json web token (JWT)', generatejwt)
    .option('-s, --service', 'get files from service endpoint (API3 and FilSwan)', getServiceEndpoint)
    .option('-m, --mint', 'mint NFT with DID (FilSwan)', mintNFT)
    .option('-t, --maintain', 'Get file details or list all files (FilSwan)', fileMaintenance)
    .parse(process.argv);