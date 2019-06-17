'use strict';

import axios from 'axios';


const API_PRODUCTS_SERVER = process.env['API_PRODUCTS_SERVER'];


export default async (id, formData) => {
  try {

    const { data } = await axios.put(`${API_PRODUCTS_SERVER}/${id}`, formData);

    return data;

  } catch (error) {
    throw error;
  }
};
