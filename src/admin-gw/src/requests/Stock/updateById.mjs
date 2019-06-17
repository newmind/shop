'use strict';

import axios from 'axios';

import { getBuffer } from "@packages/utils";


const API_STOCK_SERVER = process.env['API_STOCK_SERVER'];


export default async (id, formData) => {

  console.log();

  const { data } = await axios({
    method: 'put',
    url: `${API_STOCK_SERVER}/${id}`,
    data: formData,
  });

  return data;
};
