// scripts for publci key cryptography
import forge from 'node-forge'
var ed25519 = forge.pki.ed25519;

//forge.options.usePureJavaScript = true;
//https://github.com/digitalbazaar/forge/issues/535

function eb64(buffer) {
    return forge.util.encode64(new forge.util.ByteBuffer(buffer).bytes());
}

function db64(x) {
    return new forge.util.ByteBuffer(forge.util.decode64(x), 'binary');
}
export function createKeyPair(password){

    return new Promise((resolve, reject) => {

        var md = forge.sha256.create(); // md = message digest, aka hash
        md.update(password, 'utf8');
        var seed = md.digest().getBytes();

        try{

            var keypair = ed25519.generateKeyPair({seed: seed});            
            var privateKey = eb64(keypair.privateKey);
            var publicKey = eb64(keypair.publicKey);
            
            resolve({ publicKey, privateKey })

        }catch(err){

            reject(err)

        }
    })
}
/*
Take base64 privateKey and sign the text message
*/
export function signMessage(msg, privateKey){

    // sign a message digest (shorter "message" == better performance)
    var md = forge.md.sha256.create();
    md.update(msg, 'utf8');
    var signature = ed25519.sign({
        md: md,
        privateKey: db64(privateKey)
    });
    return eb64(signature)
}

/*
Take base64 data, decode it and verify the signature
*/
export function verifySignature(data, sig, publicKey){

    // verify a signature on a message digest
    var md = forge.md.sha256.create();
    md.update(data, 'utf8');

    var verified = ed25519.verify({
        md: md,
        // node.js Buffer, Uint8Array, forge ByteBuffer, or binary string
        signature: db64(sig),
        // node.js Buffer, Uint8Array, forge ByteBuffer, or binary string
        publicKey: db64(publicKey)
    });
    return verified
}
/*
// sign data with a private key and output DigestInfo DER-encoded bytes
// (defaults to RSASSA PKCS#1 v1.5)
// hash = message digests
var hash = forge.hash.sha1.create();
hash.update('sign this', 'utf8');
var signature = privateKey.sign(hash);

// verify data with a public key
// (defaults to RSASSA PKCS#1 v1.5)
var verified = publicKey.verify(hash.digest().bytes(), signature);

*/