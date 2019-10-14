'use strict';

import request from 'axios';


const API_PRODUCTS_SERVER = process.env['API_PRODUCTS_SERVER'];

export default () => async (ctx) => {

  const { productId } = ctx['params'];
  const { data } = await request(`${API_PRODUCTS_SERVER}/${productId}`);

  ctx.body = data;
}
