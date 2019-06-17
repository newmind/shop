'use strict';

import axios from 'axios';


const API_CURRENCIES_SERVER = process.env['API_CURRENCIES_SERVER'];


export default async () => {
  try {

    const { data } = await axios({
      method: 'get',
      url: `${API_CURRENCIES_SERVER}`,
    });

    return data;

  } catch (error) {

    console.log(error);
  }
};
