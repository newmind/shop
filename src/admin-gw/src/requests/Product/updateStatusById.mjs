'use strict';

import axios from 'axios';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async (productId, status) => {

  const { data } = await axios({
    method: 'put',
    url: `${PRODUCT_API_SRV}/products/${productId}/status/${status}`,
  });

  return data;
};
