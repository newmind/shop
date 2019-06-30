'use strict';

import axios from 'axios';

const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


const getBuffer = async (req) => {
  return new Promise((response, reject) => {

    const buffer = [];

    req.on('data', chunk => buffer.push(chunk));
    req.on('end', () => response(Buffer.concat(buffer)));
    req.on('error', error => reject(error));
  });
};

export default () => async (ctx) => {

  const buffer = await getBuffer(ctx.req);

  const res = await axios({
    method: 'post',
    url: `${PRODUCT_API_SRV}/gallery`,
    headers: {
      'content-type': ctx.req.headers['content-type']
    },
    responseType: 'stream',
    data: buffer,
  });

  ctx.body = res.data;
}
