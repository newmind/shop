'use strict';

import { models } from '@packages/db';


export default () => async (ctx) => {

  const { Stock, Product } = models;
  const brands = await Stock.findAll({
    include: [
      {
        model: Product,
        attributes: ['brand'],
        order: [['brand', 'ASC']],
        group: ['brand'],
        as: 'product'
      }
    ]
  });

  const result = brands.map(item => item['product']['brand']);

  ctx.body = {
    success: true,
    data: [
      ...result,
    ],
  };
};
