'use strict';

import axios from '@sys.packages/request';

const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async (id) => {
  try {

    return await axios.delete(`${PRODUCT_API_SRV}/units/${id}`);

  } catch (error) {

    throw error;
  }
};
