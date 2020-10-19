exports.handler = async (event) => {
    const sodium = require('tweetsodium');

    const key = event.key;
    const value = event.secret;;

    // Convert the message and key to Uint8Array's (Buffer implements that interface)
    const messageBytes = Buffer.from(value);
    const keyBytes = Buffer.from(key, 'base64');
    
    // Encrypt using LibSodium.
    const encryptedBytes = sodium.seal(messageBytes, keyBytes);
    
    // Base64 the encrypted secret
    const encrypted = Buffer.from(encryptedBytes).toString('base64');
    
    console.log(encrypted);

    
    const response = {
        statusCode: 200,
        body: JSON.stringify(encrypted),
    };
    return response;
};
