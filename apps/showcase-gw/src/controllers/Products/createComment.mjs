'use strict';

import request from 'axios';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];

export default () => async (ctx) => {
  const { productId } = ctx.params;
  const { ...formData } = ctx.request.body;

  const { data } = await request({
    method: 'post',
    url: `${PRODUCT_API_SRV}/stock/products/${productId}/comments`,
    data: formData,
  });

  ctx.body = {
    ...data['data'],
  };
}
