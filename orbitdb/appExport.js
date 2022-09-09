
import * as dotenv from 'dotenv'  
dotenv.config()
 
import { create } from 'ipfs'
import { OrbitDB } from 'orbit-db'

import jwt from 'jsonwebtoken'

async function main (didstring, tokenstring) {
  // Create IPFS instance
  const ipfsOptions = { repo : './ipfs', }
  
  const ipfs = await create(ipfsOptions)

  // Create OrbitDB instance
  const orbitdb = await OrbitDB.createInstance(ipfs)

  const db = await orbitdb.keyvalue('first-database')
  await db.put('did', {did: didstring, token: tokenstring})

  const value = db.get('did')

  console.log(value) 

  if (value == "") {
      // Create token
      const token = jwt.sign(
        { didstring },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      )

      console.log('Here is the token:')
      console.log(token)
  } else {
      console.log('DID and Token already exists in database.')
  }
  process.exit()
}

export { main }
