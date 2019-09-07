'use strict';

import axios from '@sys.packages/request';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async (id) => {

  const result = await axios({
    url: `${PRODUCT_API_SRV}/category/${id}`,
    method: 'delete',
    data: {},
  });

  if (result['success']) {
    return result['data'];
  } else {
    throw result['data'];
  }
};
