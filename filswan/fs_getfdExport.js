require('dotenv').config()
const { mcsSDK } = require('js-mcs-sdk')
const fs = require('fs') // used to read files

// set up js-mcs-sdk
const mcs = new mcsSDK({
  privateKey: process.env.PRIVATE_KEY,
  rpcUrl: process.env.RPC_URL,
})

async function getFileDetails(file_upload_id, dealId) {

  const SOURCE_FILE_UPLOAD_ID = file_upload_id
  const DEAL_ID = dealId         

  console.log(await mcs.getFileDetails(SOURCE_FILE_UPLOAD_ID, DEAL_ID))
}

module.exports = { getFileDetails };