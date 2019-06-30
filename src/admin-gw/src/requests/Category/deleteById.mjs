'use strict';

import axios from 'axios';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async (id) => {

  const {data} = await axios.delete(`${PRODUCT_API_SRV}/category/${id}`);

  if (data['success']) {
    return data;
  } else {
    throw data;
  }
};
