'use strict';

import { models } from '@packages/db';


export default () => async (ctx) => {

  const { productId } = ctx['params'];
  const product = await models['Product'].findOne({
    where: { id: productId },
    attributes: ['id', 'name', 'brand', 'description', 'status'],
    include: [
      {
        model: models['Attribute'],
        required: false,
        as: 'attributes',
        attributes: ['id', 'name', 'value'],
      },
      {
        model: models['Gallery'],
        required: false,
        as: 'gallery',
        attributes: ['file'],
        where: { productId }
      },
    ],
  });

  if ( ! product) {
    ctx.throw(404, 'Not found');
  }

  ctx.body = {
    success: true,
    data: product,
  };
};
