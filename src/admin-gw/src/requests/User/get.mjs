'use strict';

import axios from '@sys.packages/request';

const INVOICE_API_SRV = process.env['INVOICE_API_SRV'];


export default async (id) => {

  return await axios({
    method: 'get',
    url: `${INVOICE_API_SRV}/passport/${id}`,
  });
};
