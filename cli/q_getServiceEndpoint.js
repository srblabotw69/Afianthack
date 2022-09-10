const inquirer = require('inquirer');
const colors = require('colors');

const pkg = require('shelljs'); 
 
const questions = [
     { type: 'confirm', name: 'retrieve', message: 'Retrieve data from service endpoint?', default: false },
     {type: 'input', name: 'dealId', message: 'Enter the deal Id.', default: 475500,
        when: (answers) => answers.retrieve === true}
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            console.log('----------------------------');  
            console.log('You have input the following:');
            // console.log(pad(colors.grey('Retrieve data from service endpoint: '), 30), answers.retrieve);
            console.log(colors.grey('Retrieve data from service endpoint: '), answers.retrieve);
            console.log(colors.grey('deal Id: '), answers.dealId);
            console.log('----------------------------');  

            if (answers.retrieve){
                console.log("retrieving data from service endpoint...");

                aync = myfn2 = () => {
                    const { which, echo, exit, rm, cp, cd } = pkg;  
                    pkg.exec("docker start quick-deploy-container-airnode-filswan")
                    pkg.exec("docker exec quick-deploy-container-airnode-filswan node src/cli/test-api.js \
                    -e 449844b020bbd8fea80ba0b0f028697a201a4d53e4120693db9bd1d748182a66 \
                    -p \'{\"deal_id\":" + answers.dealId + ", \"source_file_upload_id\":\"" + answers.dealId + "\"}\'")
                    pkg.exec("docker stop quick-deploy-container-airnode-filswan")
                }
                myfn2();
            }
        });

 };
