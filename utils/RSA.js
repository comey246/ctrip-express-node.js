const forge = require('node-forge');
const fs = require('fs')

class RSA {

    // 注册时生成 RSA 密钥对
    static genKey(){
        const keypair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
        const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);
        const privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey)
        const key = {publicKey:publicKeyPem,privateKey:privateKeyPem}
        return key
    }

    //后端解密
    static decodePassword(encryptedBase64,privateKeyPem){
        //转base64
        const encryptedBytes = forge.util.decode64(encryptedBase64);
        //生成密钥
        const privateKey = forge.pki.privateKeyFromPem(privateKeyPem)
        //解密
        const decryptedBytes = privateKey.decrypt(encryptedBytes,'RSA-OAEP', {
            md: forge.md.sha256.create()
        });
        // 将解密后的字节数组转换为UTF-8字符串
        const decryptedPlaintext = forge.util.decodeUtf8(decryptedBytes);
        return decryptedPlaintext
    }

    //注册时加盐保存
    static genHashPassword(password){
        const salt = forge.util.encode64(forge.random.getBytesSync(16));
        const md = forge.md.sha256.create();
        md.update(password + salt, 'utf8');
        const hashPassword =  md.digest().toHex();
        const Password = {salt,hashPassword}
        return Password
    }
    static encodeHashPassword(password,salt){
        const md = forge.md.sha256.create();
        md.update(password + salt, 'utf8');
        const hashPassword =  md.digest().toHex();
        return hashPassword
    }
}
module.exports = RSA