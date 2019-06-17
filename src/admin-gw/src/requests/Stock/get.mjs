'use strict';

import axios from 'axios';


const API_STOCK_SERVER = process.env['API_STOCK_SERVER'];


export default async (filter = {}) => {
  try {

    const { data } = await axios({
      method: 'get',
      url: `${API_STOCK_SERVER}`,
      params: { ...filter }
    });

    return data;

  } catch (error) {

    console.log(error);
  }
};
