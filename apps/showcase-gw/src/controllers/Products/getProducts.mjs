'use strict';

import request from 'axios';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];

export default () => async (ctx) => {

  const { limit = 2, page = 0, ...params } = ctx.request.query;

  const { data } = await request({
    method: 'get',
    url: `${PRODUCT_API_SRV}/stock/products`,
    params: {
      take: 3,
      skip: page * 3,
      ...params,
    },
  });

  ctx.body = data;
}
