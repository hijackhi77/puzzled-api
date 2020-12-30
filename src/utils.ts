import fs from 'fs';
import crypto from 'crypto';
import md5 = require('md5');

export const encrypt = (text: string): string => {
  const array = fs.readFileSync('./resource/AESKey.txt').toString().split('\n');
  const key = Buffer.from(array[0].substr(0, 16), 'utf8');
  const iv = Buffer.from(array[1], 'utf8');
  const cipher = crypto.createCipheriv('aes-128-cfb', key, iv);
  return cipher.update(text, 'utf8', 'base64') + cipher.final('base64');
};

export const decrypt = (text: string): string => {
  const array = fs.readFileSync('./resource/AESKey.txt').toString().split('\n');
  const key = Buffer.from(array[0].substr(0, 16), 'utf8');
  const iv = Buffer.from(array[1], 'utf8');
  const decipher = crypto.createDecipheriv('aes-128-cfb', key, iv);
  return decipher.update(Buffer.from(text, 'base64'), 'binary', 'utf8') + decipher.final('utf8');
};

export const deepcopy = (object) => {
  return JSON.parse(JSON.stringify(object));
};

export const ksort = (unordered: Record<string, unknown>): Record<string, unknown> => {
  const ordered: Record<string, unknown> = {};
  Object.keys(unordered).sort().forEach((key) => {
    ordered[key] = unordered[key];
  });
  return ordered;
};

export const sign = (jsonObj: Record<string, unknown>, secretEncrypted: string): string => {
  const secret: string = decrypt(secretEncrypted);
  const jsonObjCopy: Record<string, unknown> = deepcopy(jsonObj);
  jsonObjCopy['sign'] = '';
  const strToSign = JSON.stringify(ksort(jsonObjCopy));
  return md5(strToSign + secret);
};

export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const swap = (array: any[], i: number, j: number): any[] => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  return array;
};
