'use strict';

import request from 'axios';


const API_PRODUCTS_SERVER = process.env['API_PRODUCTS_SERVER'];

export default () => async (ctx) => {
  const { limit = 2, page = 1, ...params } = ctx.request.query;

  const { data } = await request({
    method: 'get',
    url: API_PRODUCTS_SERVER,
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
