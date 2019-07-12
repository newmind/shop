'use strict';

import axios from 'axios';

import { getBuffer } from "@sys.packages/sys.utils";


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async (productId, request) => {

  const buffer = await getBuffer(request);

  const { data } = await axios({
    method: 'put',
    url: `${PRODUCT_API_SRV}/products/${productId}`,
    headers: {
      'content-type': request.headers['content-type']
    },
    responseType: 'stream',
    data: buffer,
  });

  const result = await getBuffer(data);

  console.log(result);

  return JSON.parse(result.toString());
};
