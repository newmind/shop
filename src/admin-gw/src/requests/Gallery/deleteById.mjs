'use strict';

import axios from 'axios';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async (id, formData) => {
  try {

    const { data } = await axios.put(`${PRODUCT_API_SRV}/gallery/${id}`, formData);

    return data;

  } catch (error) {
    throw error;
  }
};
