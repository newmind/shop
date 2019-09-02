'use strict';

import axios from '@sys.packages/request';

const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async (formData) => {

  return await axios({
    method: 'post',
    url: `${PRODUCT_API_SRV}/currency`,
    data: formData,
  });
};