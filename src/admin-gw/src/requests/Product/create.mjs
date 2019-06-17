'use strict';

import axios from 'axios';

import { getBuffer } from "@packages/utils";


const API_PRODUCTS_SERVER = process.env['API_PRODUCTS_SERVER'];


export default async (request) => {

  const buffer = await getBuffer(request);

  const { data } = await axios({
    method: 'post',
    url: `${API_PRODUCTS_SERVER}`,
    headers: {
      'content-type': request.headers['content-type']
    },
    responseType: 'stream',
    data: buffer,
  });

  const result = await getBuffer(data);

  return JSON.parse(result.toString());
};