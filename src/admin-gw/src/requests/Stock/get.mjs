'use strict';

import axios from '@sys.packages/request';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async (filter = {}) => {
  try {

    return await axios({
      method: 'get',
      url: `${PRODUCT_API_SRV}/stock/products`,
      params: { ...filter }
    });

  } catch (error) {

    console.log(error);
  }
};
