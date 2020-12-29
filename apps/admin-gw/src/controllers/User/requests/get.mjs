'use strict';

import { NotfoundError } from '@packages/errors';

import axios from '@sys.packages/request';

const INVOICE_API_SRV = process.env['INVOICE_API_SRV'];


export default async (id) => {

  const user = await axios({
    method: 'get',
    url: `${INVOICE_API_SRV}/passport/${id}`,
  });

  if ( ! user) {
    throw new NotfoundError({ code: '401', message: 'User не найден' });
  }

  return user;
};
