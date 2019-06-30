'use strict';

import axios from 'axios';

const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async (formData) => {

  const { data } = await axios({
    method: 'post',
    url: `${PRODUCT_API_SRV}/units`,
    data: formData,
  });

  return data;
};