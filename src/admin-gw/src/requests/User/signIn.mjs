'use strict';

import axios from 'axios';

const INVOICE_API_SRV = process.env['INVOICE_API_SRV'];


export default async (formData) => {

  const { data } = await axios({
    method: 'post',
    url: `${INVOICE_API_SRV}/connect`,
    data: formData,
  });

  return data;
};