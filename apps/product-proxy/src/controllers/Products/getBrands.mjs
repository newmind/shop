'use strict';

import { Sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {

  const { Product } = models;
  const brands = await Product.findAll({
    attributes: [
      'brand',
      [Sequelize.fn('count', Sequelize.col('Product.brand')), 'count']
    ],
    group: ['Product.brand']
  });

  const result = brands.map(productModel => {
    const productJSON = productModel.toJSON();
    return {
      brand: productJSON['brand'],
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
