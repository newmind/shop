'use strict';

import { models } from '@packages/db';


export default () => async (ctx) => {

  const { productId } = ctx.params;

  const products = await models['Stock'].findOne({
    attributes: ['id', 'count', 'amount'],
    where: { id: productId },
    include: [
      {
        model: models['Currency'],
        required: false,
        as: 'currency',
        attributes: ['id', 'value']
      },
      {
        model: models['Category'],
        required: false,
        as: 'category',
        attributes: ['id', 'name']
      },
      {
        model: models['Product'],
        attributes: ['id', 'name', 'brand', 'description', 'status'],
        required: true,
        as: 'product',
        where: { status: 1 },
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
          },
        ]
      }
    ],
  });

  ctx.body = {
    success: true,
    data: products,
  };
};
