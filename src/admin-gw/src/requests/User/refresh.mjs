'use strict';

import axios from 'axios';

const INVOICE_API_SRV = process.env['INVOICE_API_SRV'];


export default async (token) => {

  const { data } = await axios({
    method: 'post',
    url: `${INVOICE_API_SRV}/refresh`,
    data: {
      token
    },
  });

  return data;
};