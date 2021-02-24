
import request from '@sys.packages/request';

import productBuilder from "../_utils/productBuilder.mjs";


export default () => async (ctx) => {
  const { page = 0, ...params } = ctx.request.query;

  const { data: types } = await request({
    url: process.env['PRODUCT_API_SRV'] + `/products/types`,
    method: 'get',
    params: ctx['request']['query'],
  });
  const { data: categories } = await request({
    url: process.env['PRODUCT_API_SRV'] + `/products/categories`,
    method: 'get',
    params: ctx['request']['query'],
  });
  const { data: brands } = await request({
    url: process.env['PRODUCT_API_SRV'] + `/products/brands`,
    method: 'get',
    params: ctx['request']['query'],
  });
  const { data: attributes } = await request({
    url: process.env['PRODUCT_API_SRV'] + `/products/attributes`,
    method: 'get',
    params: ctx['request']['query'],
  });

  let { data: products, meta } = await request({
    method: 'get',
    url: process.env['PRODUCT_API_SRV'] + `/products`,
    params: {
      use: true,
      take: Number(process.env['TAKE']),
      skip: (page > 0 ? page - 1 : 0) * Number(process.env['TAKE']),
      ...params,
    },
  });

  ctx.body = {
    success: true,
    data: products.map((product) => productBuilder(product, true)),
    meta: meta,
    filter: {
      types: types.map((item) => ({ id: item['id'], value: item['value'], count: Number(item['count']) })),
      brands: brands.map((item) => ({ id: item['id'], value: item['value'], count: Number(item['count']) })),
      categories: categories.map((item) => ({ id: item['id'], value: item['value'], count: Number(item['count']) })),
      attributes,
    }
  };
}
