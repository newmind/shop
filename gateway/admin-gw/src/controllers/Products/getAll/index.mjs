
import request from '@sys.packages/request';

import productBuilder from "./productBuilder.mjs";


export default () => async (ctx) => {
  const { page = 0, ...params } = ctx['request']['query'];

  const { data: types } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products/types',
    method: 'get',
    params,
  });
  const { data: categories } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products/categories',
    method: 'get',
    params,
  });
  const { data: brands } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products/brands',
    method: 'get',
    params,
  });

  const { data, meta } = await request({
    method: 'get',
    url: process.env['PRODUCT_API_SRV'] + '/products',
    params: {
      take: Number(process.env['TAKE']),
      skip: (page > 0 ? page - 1 : 0) * Number(process.env['TAKE']),
      ...params,
    },
  });

  ctx.body = {
    success: true,
    data: data.map((product) => productBuilder(product)),
    filter: {
      types: types,
      brands: brands,
      categories: categories,
    },
    meta: {
      total: meta['total'],
    },
  };
}
