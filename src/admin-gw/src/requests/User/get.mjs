'use strict';

import axios from 'axios';

const INVOICE_API_SRV = process.env['INVOICE_API_SRV'];


export default async (id) => {

  const { data } = await axios({
    method: 'get',
    url: `${INVOICE_API_SRV}/passport/${id}`,
  });

  return data;
};
