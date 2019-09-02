'use strict';

import axios from '@sys.packages/request';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async (productId, formData) => {
  try {

    return await axios.put(`${PRODUCT_API_SRV}/gallery/${productId}`, formData);

  } catch (error) {

  }
};
