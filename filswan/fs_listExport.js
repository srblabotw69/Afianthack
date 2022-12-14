require('dotenv').config()
const { mcsSDK } = require('js-mcs-sdk')
 
const fs = require('fs') // used to read files

// set up js-mcs-sdk
const mcs = new mcsSDK({
  privateKey: process.env.PRIVATE_KEY,
  rpcUrl: process.env.RPC_URL,
})

let flist = async () => {

  // ENTER PARAMETERS
  const FILE_NAME = ''
  const ORDER_BY = ''
  const IS_ASCEND = ''
  const STATUS = ''
  const IS_MINTED = ''
  const PAGE_NUMBER = 1
  const PAGE_SIZE = '10'
 
  const uploads = await mcs.getUploads(
    mcs.publicKey,
    FILE_NAME,
    ORDER_BY,
    IS_ASCEND,
    STATUS,
    IS_MINTED,
    PAGE_NUMBER,
    PAGE_SIZE,
  )

  console.log(uploads.data.source_file_upload)
}

module.exports = { flist };

 