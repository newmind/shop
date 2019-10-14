'use strict';

import request from 'axios';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];

export default () => async (ctx) => {

  const { productId } = ctx['params'];
  const { data } = await request(`${PRODUCT_API_SRV}/products/${productId}`);

  ctx.body = data;
}
