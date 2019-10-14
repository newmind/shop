'use strict';

import axios from '@sys.packages/request';

const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async (id, formData) => {

  return await axios({
    method: 'put',
    url: `${PRODUCT_API_SRV}/category/${id}`,
    data: formData,
  });
};
