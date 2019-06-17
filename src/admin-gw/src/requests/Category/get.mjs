'use strict';

import axios from 'axios';


const API_CATEGORY_SERVER = process.env['API_CATEGORY_SERVER'];


export default async () => {
  try {

    const { data } = await axios({
      method: 'get',
      url: `${API_CATEGORY_SERVER}`,
    });

    return data;

  } catch (error) {

    console.log(error);
  }
};
