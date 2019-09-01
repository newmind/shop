'use strict';

import axios from 'axios';

const INVOICE_API_SRV = process.env['INVOICE_API_SRV'];


export default async (id, formData) => {

  const { data } = await axios({
    method: 'put',
    url: `${INVOICE_API_SRV}/passport/${id}`,
    data: formData,
  });

  return data;
};
