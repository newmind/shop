'use strict';

import axios from 'axios';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async (formData) => {
  try {

    const { data } = await axios.post(`${PRODUCT_API_SRV}/gallery`, formData);

    return data;

  } catch (error) {
    throw error;
  }
};
