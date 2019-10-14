'use strict';

import axios from '@sys.packages/request';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async (formData) => {
  try {

    return await axios.post(`${PRODUCT_API_SRV}/gallery`, formData);

  } catch (error) {

    throw error;
  }
};
