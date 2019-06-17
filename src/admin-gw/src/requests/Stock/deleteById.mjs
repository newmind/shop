'use strict';

import axios from 'axios';


const API_STOCK_SERVER = process.env['API_STOCK_SERVER'];


export default async (id) => {
  try {

    const { data } = await axios.delete(`${API_STOCK_SERVER}/${id}`);

    return data;

  } catch (error) {
    throw error;
  }
};
