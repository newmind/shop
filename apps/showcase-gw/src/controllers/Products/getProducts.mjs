'use strict';

import request from 'axios';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];

export default () => async (ctx) => {
  const { limit = 2, page = 1, ...params } = ctx.request.query;

  const { data } = await request({
    method: 'get',
    url: `${PRODUCT_API_SRV}/stock/products`,
    params: params,
  });

  const { products, count } = data['data'];

  ctx.body = {
    items: [ ...products ],
    count: count,
    paging: {
      page: page,
      pages: Math.ceil(count / limit),
    },
  };
}
