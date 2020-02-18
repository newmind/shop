'use strict';

import request from 'axios';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];

export default () => async (ctx) => {
  try {
    const { page = 0, ...params } = ctx.request.query;

    const { data: forms } = await request({
      url: `${PRODUCT_API_SRV}/products/forms`,
      method: 'get',
      params: ctx['request']['query'],
    });
    const { data: colors } = await request({
      url: `${PRODUCT_API_SRV}/products/colors`,
      method: 'get',
      params: ctx['request']['query'],
    });
    const { data: brands } = await request({
      url: `${PRODUCT_API_SRV}/products/brands`,
      method: 'get',
      params: ctx['request']['query'],
    });
    const { data: materials } = await request({
      url: `${PRODUCT_API_SRV}/products/materials`,
      method: 'get',
      params: ctx['request']['query'],
    });
    const { data: categories } = await request({
      url: `${PRODUCT_API_SRV}/products/categories`,
      method: 'get',
      params: ctx['request']['query'],
    });

    const { data } = await request({
      method: 'get',
      url: `${PRODUCT_API_SRV}/products`,
      params: {
        take: process.env['TAKE'],
        skip: (page > 0 ? page - 1 : 0) * process.env['TAKE'],
        ...params,
      },
    });

    ctx.body = {
      success: true,
      data: data['data'],
      meta: data['meta'],
      filter: {
        forms: forms['data'],
        colors: colors['data'],
        brands: brands['data'],
        materials: materials['data'],
        categories: categories['data'],
      }
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = { ...error['data'] };
  }
}
