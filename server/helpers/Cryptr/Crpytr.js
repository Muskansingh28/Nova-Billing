import Cryptr from 'cryptr';
const cryptr = new Cryptr('ldskjfLKKJJ');

function Encryptr (plainString) {
    const encryptedString = cryptr.encrypt(plainString);
    return encryptedString;
}

function Decryptr (scrambledString) {
    if(scrambledString == ''){
        return "";
    }
    const decryptedString = cryptr.decrypt(scrambledString);
    return decryptedString;
}

export { Encryptr, Decryptr };