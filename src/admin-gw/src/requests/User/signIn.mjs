'use strict';

import axios from 'axios';


const API_INVOICE = process.env['API_INVOICE'];


export default async (formData) => {

  const { data } = await axios({
    method: 'post',
    url: `${API_INVOICE}/connect`,
    data: formData,
  });

  return data;
};