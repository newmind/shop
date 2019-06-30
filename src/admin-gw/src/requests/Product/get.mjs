'use strict';

import axios from 'axios';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async (filter = {}) => {
  try {

    const { data } = await axios({
      method: 'get',
      url: `${PRODUCT_API_SRV}/products`,
      params: { ...filter }
    });

    return data;

  } catch (error) {
    console.log(11111, error);
  }
};
