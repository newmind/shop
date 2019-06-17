'use strict';

import axios from 'axios';


const API_PRODUCTS_SERVER = process.env['API_PRODUCTS_SERVER'];


export default async (productId, formData) => {
  try {

    const { data } = await axios.put(`${API_PRODUCTS_SERVER}/${productId}`, formData);

    return data;

  } catch (error) {

  }
};
