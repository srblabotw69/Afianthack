require('dotenv').config()
const { mcsSDK } = require('js-mcs-sdk');
const fs = require('fs') // used to read files

// set up js-mcs-sdk
const mcs = new mcsSDK({
  privateKey: process.env.PRIVATE_KEY,
  rpcUrl: process.env.RPC_URL,
})

const fsupload = async (fname, filepath) => {

  const fileArray = [{ fileName: fname, file: fs.createReadStream(filepath + fname) }]

  const uploadResponse = await mcs.upload(fileArray)
  console.log(uploadResponse)
  
  return (uploadResponse);
}

module.exports = { fsupload };