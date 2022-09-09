require('dotenv').config()
const { mcsSDK } = require('js-mcs-sdk')

// set up js-mcs-sdk
const mcs = new mcsSDK({
  privateKey: process.env.PRIVATE_KEY,
  rpcUrl: process.env.RPC_URL,
})
 
const fsmint = async (SOURCE_FILE_UPLOAD_ID, IPFS_URL, NFT_NAME, NFT_DESCRIPTION) => {
 
  const nft = {
    name: NFT_NAME, // the name of your NFT
    image: IPFS_URL, // asset URI, images will render on Opensea
    external_url: IPFS_URL, // Opensea will provide a link to view the source
    description: NFT_DESCRIPTION, // description of your NFT
    attributes: [], // NFT attributes displayed on Opensea
  }

  const mintTx = await mcs.mintAsset(SOURCE_FILE_UPLOAD_ID, nft)
  console.log(mintTx)
}

const fsmintwithDID = async (SOURCE_FILE_UPLOAD_ID, IPFS_URL, NFT_NAME, NFT_DESCRIPTION, DID) => {
 
  const nft = {
    name: NFT_NAME, // the name of your NFT
    image: IPFS_URL, // asset URI, images will render on Opensea
    external_url: IPFS_URL, // Opensea will provide a link to view the source
    description: NFT_DESCRIPTION, // description of your NFT
    attributes: [DID], // NFT attributes displayed on Opensea
  }

  const mintTx = await mcs.mintAsset(SOURCE_FILE_UPLOAD_ID, nft)
  console.log(mintTx)
}
 
module.exports = { fsmint, fsmintwithDID};
