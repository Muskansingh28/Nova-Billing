import CryptoJS from 'crypto-js';

function Decryptr (scrambledString) {
    const decryptedString = CryptoJS.AES.decrypt(scrambledString, 'ldskjfLKKJJ').toString(CryptoJS.enc.Utf8);
    console.log(decryptedString);
    return decryptedString;
}

export { Decryptr };