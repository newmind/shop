'use strict';

import request from '@sys.packages/request';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async (filter = {}) => {
  try {

    return await request({
      method: 'get',
      url: `${PRODUCT_API_SRV}/products`,
      params: { ...filter }
    });

  } catch (error) {
    console.log(11111, error);
  }
};
