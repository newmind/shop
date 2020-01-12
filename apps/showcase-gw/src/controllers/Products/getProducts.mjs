'use strict';

import request from 'axios';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];

export default () => async (ctx) => {
  try {
    const { page = 0, ...params } = ctx.request.query;

    const { data } = await request({
      method: 'get',
      url: `${PRODUCT_API_SRV}/products`,
      params: {
        take: process.env['TAKE'],
        skip: (page > 0 ? page - 1 : 0) * process.env['TAKE'],
        ...params,
      },
    });

    ctx.body = data;
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = { ...error['data'] };
  }
}
