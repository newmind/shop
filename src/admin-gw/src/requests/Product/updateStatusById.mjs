'use strict';

import axios from 'axios';


const API_PRODUCTS_SERVER = process.env['API_PRODUCTS_SERVER'];


export default async (productId, status) => {

  const { data } = await axios({
    method: 'put',
    url: `${API_PRODUCTS_SERVER}/${productId}/status/${status}`,
  });

  return data;
};
