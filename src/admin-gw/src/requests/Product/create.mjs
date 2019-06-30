'use strict';

import axios from 'axios';

import { getBuffer } from "@packages/sys.utils";


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async (request) => {

  const buffer = await getBuffer(request);

  const { data } = await axios({
    method: 'post',
    url: `${PRODUCT_API_SRV}/products`,
    headers: {
      'content-type': request.headers['content-type']
    },
    responseType: 'stream',
    data: buffer,
  });

  const result = await getBuffer(data);

  return JSON.parse(result.toString());
};