'use strict';

import axios from 'axios';


const API_STOCK_SERVER = process.env['API_STOCK_SERVER'];


export default async (formData) => {

  const { data } = await axios({
    method: 'post',
    url: `${API_STOCK_SERVER}`,
    data: formData,
  });

  return data;
};