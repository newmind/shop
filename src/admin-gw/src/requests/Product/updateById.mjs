'use strict';

import axios from 'axios';

import { getBuffer } from "@packages/sys.utils";


const API_PRODUCTS_SERVER = process.env['API_PRODUCTS_SERVER'];


export default async (productId, request) => {

  const buffer = await getBuffer(request);

  const { data } = await axios({
    method: 'put',
    url: `${API_PRODUCTS_SERVER}/${productId}`,
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
