'use strict';

import axios from 'axios';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async () => {

  const { data } = await axios.get(`${PRODUCT_API_SRV}/products`);

  return data;
};
