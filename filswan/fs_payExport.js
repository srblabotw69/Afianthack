require('dotenv').config()
const { mcsSDK} = require('js-mcs-sdk')

// set up js-mcs-sdk
const mcs = new mcsSDK({
  privateKey: process.env.PRIVATE_KEY,
  rpcUrl: process.env.RPC_URL,
})

const fspay = async (w_cid, min_amt, f_size) => {
  const tx = await mcs.makePayment(w_cid, min_amt, f_size)
  console.log(tx.transactionHash)
  return tx.transactionHash;
}

module.exports = { fspay };