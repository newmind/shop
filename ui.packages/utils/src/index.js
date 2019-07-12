'use strict';

import fs from "fs";
import BusBoy from 'busboy';

const extensions = {
  'image/jpeg': 'jpg',
  'image/bmp': 'bmp',
  'image/png': 'png'
};


export const UUID = () => {
  let dt = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt/16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
};

export const sleep = async (time) => {
  return new Promise(resolve => setTimeout(resolve, time));
};

export const nounDeclension = (number = 0, titles = []) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20)
    ? 2
    : cases[(number % 10 < 5)
      ? number % 10
      : 5]];
};

export const reduceToArray = (items, SIZE = 4) => {
  return items.reduce((p, c) => {
    if( p[p.length - 1].length === SIZE) {
      p.push([]);
    }
    p[p.length - 1].push(c);
    return p;
  }, [[]]);
};

export const objectToQuery = (object) => {
  let query = {};
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key];
      if ( !! value) {
        query[key] = value;
      }
    }
  }
  const searchURL = new URLSearchParams(query);
  return searchURL.toString();
};

export const queryToObject = (query) => {
  const searchURL = new URLSearchParams(query);
  let params = {};
  for (let param of searchURL) {
    if ( !! param[1]) {
      let paramValue = param[1];
      if (/^(\d+)$/.test(paramValue)) {
        paramValue = Number(paramValue);
      } else if (/^(true)$/.test(paramValue)) {
        paramValue = true;
      } else if (/^(false)$/.test(paramValue)) {
        paramValue = false;
      }
      params[param[0]] = paramValue;
    }
  }
  return params;
};

export const getBuffer = (result) => {
  return new Promise((response, reject) => {

    const buffer = [];

    result.on('data', chunk => buffer.push(chunk));
    result.on('end', () => response(Buffer.concat(buffer)));
    result.on('error', error => reject(error));
  });
};

export const saveFile = (buffer, path) => {

  return new Promise((resolve) => {

    const stream = fs.createWriteStream(path);

    stream.write(buffer, 'utf16le', resolve);
  });
};

export const getFiles = async (req) => {

  return new Promise((resolve, reject) => {

    const result = { files: {}, fields: {} };
    const bb = new BusBoy({ headers: req.headers });

    bb.on('file', (fieldName, file, filename, encoding, mimeType) => {

      const hashString = UUID();
      const fileName = `${hashString}.${extensions[mimeType]}`;

      result['files'][fieldName] = {
        fileName: fileName,
        mimeType: mimeType,
        encoding: encoding,
        buffer: []
      };

      file.on('data', (data) => {
        result['files'][fieldName]['buffer'].push(data);
      });

      file.on('end', () => {
        result['files'][fieldName]['buffer'] = Buffer.concat(result['files'][fieldName]['buffer']);
      });
    });

    // bb.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    bb.on('field', function(fieldname, val) {
      result['fields'][fieldname] = val;
    });

    bb.on('error', error => reject(error));

    bb.on('finish', () => {
      resolve(result);
    });

    req.pipe(bb);
  });
};