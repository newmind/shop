'use strict';

import axios from 'axios';

const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async (id) => {
  try {

    const { data } = await axios.delete(`${PRODUCT_API_SRV}/units/${id}`);

    return data;

  } catch (error) {

    throw error;
  }
};
