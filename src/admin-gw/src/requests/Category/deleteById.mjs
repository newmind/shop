'use strict';

import axios from 'axios';


const API_CATEGORY_SERVER = process.env['API_CATEGORY_SERVER'];


export default async (id) => {

  const {data} = await axios.delete(`${API_CATEGORY_SERVER}/${id}`);

  if (data['success']) {
    return data;
  } else {
    throw data;
  }
};
