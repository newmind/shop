
import request from '@sys.packages/request';

import productBuilder from "../_utils/productBuilder.mjs";


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default () => async (ctx) => {
  const { page = 0, ...params } = ctx.request.query;

  const { data: types } = await request({
    url: `${PRODUCT_API_SRV}/products/types`,
    method: 'get',
    params: ctx['request']['query'],
  });
  const { data: categories } = await request({
    url: `${PRODUCT_API_SRV}/products/categories`,
    method: 'get',
    params: ctx['request']['query'],
  });
  const { data: brands } = await request({
    url: `${PRODUCT_API_SRV}/products/brands`,
    method: 'get',
    params: ctx['request']['query'],
  });

  const { data: products, meta } = await request({
    method: 'get',
    url: `${PRODUCT_API_SRV}/products`,
    params: {
      take: Number(process.env['TAKE']),
      skip: (page > 0 ? page - 1 : 0) * Number(process.env['TAKE']),
      ...params,
    },
  });

  ctx.body = {
    success: true,
    data: products.map((product) => productBuilder(product)),
    meta: meta,
    filter: {
      types: types,
      brands: brands,
      categories: categories,
    }
  };
}
