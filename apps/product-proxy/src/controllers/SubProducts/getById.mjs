'use strict';

import { models } from '@sys.packages/db';


export default () => async (ctx) => {

  const { productId } = ctx['params'];
  const { SubProduct, Gallery } = models;

  const product = await SubProduct.findOne({
    where: { id: productId },
    attributes: ['id', 'name', 'brand', 'description', 'status'],
    include: [
      {
        model: Gallery,
        required: false,
        as: 'gallery',
        attributes: ['id'],
        where: { productId },
        order: [
          ['order', 'DESC']
        ]
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
