'use strict';

import axios from '@sys.packages/request';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async (id) => {

  const result = await axios.delete(`${PRODUCT_API_SRV}/category/${id}`);

  if (data['success']) {
    return result;
  } else {
    throw data;
  }
};
