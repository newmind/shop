'use strict';

import axios from 'axios';


const API_PRODUCTS_SERVER = process.env['API_PRODUCTS_SERVER'];


export default async (ctx) => {
  try {

    const { data } = await axios.get(API_PRODUCTS_SERVER);

    return data;

  } catch (error) {

  }
};
