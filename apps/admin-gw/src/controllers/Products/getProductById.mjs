'use strict';

import request from 'axios';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];

export default () => async (ctx) => {
  try {
    const { productId } = ctx['params'];

    const { data } = await request({
      url: PRODUCT_API_SRV + '/products',
      method: 'get',
      params: {
        id: productId,
      }
    });

    ctx.body = {
      success: true,
      data: data['data'][0] || null,
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = { success: false, data: { code: '500', message: error['message'] }};
  }
}
