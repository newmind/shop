'use strict';

import axios from '@sys.packages/request';

const INVOICE_API_SRV = process.env['INVOICE_API_SRV'];


export default async (id, formData) => {

  return await axios({
    method: 'put',
    url: `${INVOICE_API_SRV}/passport/${id}`,
    data: formData,
  });
};
