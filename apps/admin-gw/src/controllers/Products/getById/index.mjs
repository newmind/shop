'use strict';

import request from 'axios';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];

export default () => async (ctx) => {
  const {uuid} = ctx['params'];

  const {data} = await request({
    url: PRODUCT_API_SRV + '/products',
    method: 'get',
    params: {
      uuid,
    }
  });

  ctx.body = {
    success: true,
    data: data['data'][0] || null,
  };
}
