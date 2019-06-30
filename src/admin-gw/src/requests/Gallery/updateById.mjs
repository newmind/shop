'use strict';

import axios from 'axios';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async (productId, formData) => {
  try {

    const { data } = await axios.put(`${PRODUCT_API_SRV}/gallery/${productId}`, formData);

    return data;

  } catch (error) {

  }
};
