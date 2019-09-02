'use strict';

import axios from '@sys.packages/request';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async (id, formData) => {
  try {

    return await axios.put(`${PRODUCT_API_SRV}/gallery/${id}`, formData);

  } catch (error) {

    throw error;
  }
};
