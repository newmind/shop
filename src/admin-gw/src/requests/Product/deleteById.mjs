'use strict';

import axios from 'axios';


const API_PRODUCTS_SERVER = process.env['API_PRODUCTS_SERVER'];


export default async (id) => {
  try {

    const { data } = await axios.delete(`${API_PRODUCTS_SERVER}/${id}`);

    return data;

  } catch (error) {
    throw error;
  }
};
