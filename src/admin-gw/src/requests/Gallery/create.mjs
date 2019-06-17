'use strict';

import axios from 'axios';


const API_PRODUCTS_SERVER = process.env['API_PRODUCTS_SERVER'];


export default async (formData) => {
  try {

    const { data } = await axios.post(API_PRODUCTS_SERVER, formData);

    return data;

  } catch (error) {
    throw error;
  }
};
