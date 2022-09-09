const { Command } = require('commander');

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
 
const algorithm = 'aes-256-cbc';  
const keyLength = 32;
const password = '12345';
const salt = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
// const key = crypto.scryptSync(password, salt, keyLength);
const key = crypto.scryptSync(password, '', keyLength);

// Encrypt
function encrypt(file) {
    var filename = path.parse(file).name; 
 
    fs.writeFile(process.env.TESTFILE_DIR + filename +'.iv', iv.toString('hex') , (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File encrypted successfully and has the following contents:");
          console.log(fs.readFileSync(process.env.TESTFILE_DIR + filename + '.iv', "utf8"));
        }
      });

    var cipher = crypto.createCipheriv(algorithm, key, iv);
    var input = fs.createReadStream(process.env.TESTFILE_DIR + file);
    var output = fs.createWriteStream(process.env.TESTFILE_DIR + filename +'.enc');
    input.pipe(cipher).pipe(output);
    
    output.on('finish', () => {
        console.log('File encrypted!');
        //decrypt(filename +'.enc');
    });               
}

// Decrypt
function decrypt(file) {
  
    var filename = path.parse(file).name;  

    fs.readFile(process.env.TESTFILE_DIR + filename + '.iv', 'utf8', function(err, data) {
        if (err) 
            console.log(err);
        else {
            decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(data, 'hex'));
            var input = fs.createReadStream(process.env.TESTFILE_DIR + file);
            var output = fs.createWriteStream(process.env.TESTFILE_DIR + filename +'.dec');
            input.pipe(decipher).pipe(output);
            
            output.on('finish', () => {
                // console.log("File decrypted successfully and has the following contents:");
                // console.log(fs.readFileSync(process.env.TESTFILE_DIR + filename + '.dec', "utf8"));
                console.log('File decrypted successfully to ' + process.env.TESTFILE_DIR + filename +'.dec');
             });     
        }
       });
}
 
module.exports = { encrypt, decrypt };
