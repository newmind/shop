'use strict';

import { Sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {

  const { Product } = models;
  const brands = await Product.findAll({
    attributes: [
      'color',
      [Sequelize.fn('count', Sequelize.col('Product.color')), 'count']
    ],
    group: ['Product.color']
  });

  const result = brands.map(productModel => {
    const productJSON = productModel.toJSON();
    return {
      color: productJSON['color'],
      count: productJSON['count'],
    }
  });

  ctx.body = {
    success: true,
    data: [
      ...result,
    ],
  };
};
