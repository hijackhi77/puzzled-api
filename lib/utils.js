const fs = require('fs');
const crypto = require('crypto');
const md5 = require('md5');

const encrypt = (text) => {
  console.log(__dirname);
  let array = fs.readFileSync('./resource/AESKey.txt').toString().split('\n');
  let key = Buffer.from(array[0].substr(0, 16), 'utf8');
  let iv = Buffer.from(array[1], 'utf8');
  let cipher = crypto.createCipheriv('aes-128-cfb', key, iv);
  return cipher.update(text, 'utf8', 'base64') + cipher.final('base64');
};

const decrypt = (text) => {
  let array = fs.readFileSync('./resource/AESKey.txt').toString().split('\n');
  let key = Buffer.from(array[0].substr(0, 16), 'utf8');
  let iv = Buffer.from(array[1], 'utf8');
  let decipher = crypto.createDecipheriv('aes-128-cfb', key, iv);
  return decipher.update(Buffer.from(text, 'base64'), 'binary', 'utf8') + decipher.final('utf8');
};

const deepcopy = (object) => {
  return JSON.parse(JSON.stringify(object));
};

const ksort = (unordered) => {
  let ordered = {};
  Object.keys(unordered).sort().forEach((key) => {
    ordered[key] = unordered[key];
  });
  return ordered;
};

const sign = (jsonObj, secretEncrypted) => {
  let secret = decrypt(secretEncrypted);
  let jsonObjCopy = deepcopy(jsonObj);
  jsonObjCopy['sign'] = '';
  let strToSign = JSON.stringify(ksort(jsonObjCopy));
  return md5(strToSign + secret);
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

module.exports = {
  encrypt,
  decrypt,
  deepcopy,
  ksort,
  sign,
  getRandomInt
};