'use strict';

import request from 'axios';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];

export default () => async (ctx) => {
  try {
    const { uuid } = ctx['params'];

    const { data } = await request({
      method: 'get',
      url: `${PRODUCT_API_SRV}/products`,
      params: {
        uuid,
        status: 1,
      }
    });

    const product = data['data'][0];

    if ( ! product) {

      ctx.static = 404;
      return ctx.body = { code: '404', message: 'Продукт не найден' };
    }

    ctx.body = {
      success: true,
      data: product,
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = { success: false, error: { code: '500', message: error['message'] }};
  }
}