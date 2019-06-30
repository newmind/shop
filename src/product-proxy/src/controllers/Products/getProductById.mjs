'use strict';

import { models } from '@packages/db';


export default () => async (ctx) => {
  const { productId } = ctx['params'];
  const { Units } = models;

  const product = await models['Product'].findOne({
    where: { id: productId },
    attributes: ['id', 'name', 'brand', 'description', 'status'],
    include: [
      {
        model: models['Attribute'],
        required: false,
        as: 'attributes',
        attributes: ['id', 'name', 'value'],
        include: [
          {
            model: Units,
            required: false,
            as: 'unit',
            attributes: ['id', 'value']
          }
        ]
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

  const productJSON = product.toJSON();

  ctx.body = {
    success: true,
    data: productJSON,
  };
};
