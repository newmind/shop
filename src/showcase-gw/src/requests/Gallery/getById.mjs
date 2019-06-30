'use strict';

import axios from 'axios';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async (ctx) => {
  try {

    const { data } = await axios.get(`${PRODUCT_API_SRV}/stock/products`);

    return data;

  } catch (error) {

  }
};
