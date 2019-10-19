'use strict';

import axios from '@sys.packages/request';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async () => {

  return await axios({
    url: `${PRODUCT_API_SRV}/stock/products`,
    method: 'get',
  });
};