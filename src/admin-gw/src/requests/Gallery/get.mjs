'use strict';

import axios from '@sys.packages/request';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async () => {
  try {

    return  await axios.get(`${PRODUCT_API_SRV}/gallery`);

  } catch (error) {

  }
};
