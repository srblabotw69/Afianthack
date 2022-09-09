const ION = require('@decentralized-identity/ion-tools');
const { exit } = require('process');
const fs = require('fs').promises
 
const createDID = async () => {
    // Create private/public key pair
    const authnKeys = await ION.generateKeyPair('secp256k1')
    console.log("Created private/public key pair")
    console.log("Public key:", authnKeys.publicJwk)

    // Write private and public key to files
    await fs.writeFile(
        process.env.KEY_DIR + 'publicKey.json',
        JSON.stringify(authnKeys.publicJwk)
    )
    console.log("Wrote public key to " + process.env.KEY_DIR + "publicKey.json")

    await fs.writeFile(
        process.env.KEY_DIR + 'privateKey.json',
        JSON.stringify(authnKeys.privateJwk)
    )
    console.log("Wrote private key to " + process.env.KEY_DIR + "privateKey.json")

    // Create a DID
    const did = new ION.DID({
        content: {
            publicKeys: [
                {
                    id: 'auth-key',
                    type: 'EcdsaSecp256k1VerificationKey2019',
                    publicKeyJwk: authnKeys.publicJwk,
                    purposes: ['authentication']
                }
            ],
            services: [
                {
                    id: "myId",
                    type: "myType",
                    serviceEndpoint: {
                        "@context": "my.serviceEndPoint.identity/data",
                        "@type": "myServiceEndpoint",
                        instance: [
                            "did:demo:my.id",
                        ]
                    }
                }
            ],
        }
    })

    const didUri = await did.getURI('short')
    console.log("Generated DID:", didUri)

    // // Anchor the DID to ION
    // const anchorRequestBody = await did.generateRequest()
    // const anchorRequest = new ION.AnchorRequest(anchorRequestBody)
    // const anchorResponse = await anchorRequest.submit()
    // console.log("Anchor response", anchorResponse)

    // Resolve
    const response = await ION.resolve('did:ion:EiCjHFpU1Fm6Qnq7XIj_Gt2QGCpnwQrrnUWoVrM4H9we1A')
    console.log(JSON.stringify(response))

    exit();
}

const signWithDID = async (ipfs_path) => {
    
    // Sign data with DID
    const privateKey = JSON.parse(await fs.readFile('privateKey.json'))
    //const myData = 'This message is signed and cannot be tempered with'
    const myData = readFromURL(ipfs_path);
    const signature = await ION.signJws({
        payload: myData,
        privateJwk: privateKey
    });
    console.log("Signed JWS:", signature)

    const randomKeyPair = await ION.generateKeyPair('secp256k1')
    let verifiedJws = await ION.verifyJws({
        jws: signature,
        publicJwk: randomKeyPair.publicJwk
    })
    console.log("Verify with random new key:", verifiedJws)

    const publicKey = JSON.parse(await fs.readFile('publicKey.json'))
    verifiedJws = await ION.verifyJws({
        jws: signature,
        publicJwk: publicKey
    })
    console.log("Verify with my public key:", verifiedJws)
 
}


const readFromURL = async (ipfs_path) => {
    
     var http = require('https');
 
    // var options = {
    //     host: 'calibration-ipfs.filswan.com',
    //     path: '/ipfs/QmQFPeQFtcSFZEVTGyCSwRNM4MWjng4azJFNekJWqCR1Uj'
    // }
    var options = {
        host: 'calibration-ipfs.filswan.com',
        path: ipfs_path
    }

    var request = http.request(options, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            console.log(data);

        });
    });
    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();
 
}


module.exports = { createDID, signWithDID, readFromURL };