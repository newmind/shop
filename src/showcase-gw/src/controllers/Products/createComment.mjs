'use strict';

import request from 'axios';


const API_PRODUCTS_SERVER = process.env['API_PRODUCTS_SERVER'];

export default () => async (ctx) => {
  const { productId } = ctx.params;
  const { ...formData } = ctx.request.body;

  const { data } = await request({
    method: 'post',
    url: `${API_PRODUCTS_SERVER}/${productId}/comments`,
    data: formData,
  });

  ctx.body = {
    ...data['data'],
  };
}
