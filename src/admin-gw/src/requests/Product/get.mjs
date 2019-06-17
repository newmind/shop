'use strict';

import axios from 'axios';


const API_PRODUCTS_SERVER = process.env['API_PRODUCTS_SERVER'];


export default async (filter = {}) => {
  try {

    const { data } = await axios({
      method: 'get',
      url: API_PRODUCTS_SERVER,
      params: { ...filter }
    });

    return data;

  } catch (error) {
    console.log(error);
  }
};
