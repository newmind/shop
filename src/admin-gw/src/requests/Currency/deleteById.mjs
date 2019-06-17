'use strict';

import axios from 'axios';


const API_CURRENCIES_SERVER = process.env['API_CURRENCIES_SERVER'];


export default async (id) => {
  try {

    const { data } = await axios.delete(`${API_CURRENCIES_SERVER}/${id}`);

    return data;

  } catch (error) {

    throw error;
  }
};
