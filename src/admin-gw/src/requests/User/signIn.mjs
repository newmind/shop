'use strict';

import axios from '@sys.packages/request';

const INVOICE_API_SRV = process.env['INVOICE_API_SRV'];


export default async (formData) => {

  return await axios({
    method: 'post',
    url: `${INVOICE_API_SRV}/connect`,
    data: formData,
  });
};