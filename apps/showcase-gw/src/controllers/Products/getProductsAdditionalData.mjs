'use strict';

import request from 'axios';

const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default () => async (ctx) => {
  try {

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

    ctx.body = {
      success: true,
      data: {
        forms: [...forms['data']],
        colors: [...colors['data']],
        brands: [...brands['data']],
        materials: [...materials['data']],
        categories: [...categories['data']],
      },
    };
  }
  catch(error) {

    console.log(error)

    ctx.status = 500;
    ctx.body = { success: false, error: { code: '500', message: error['message'] }};
  }
}
