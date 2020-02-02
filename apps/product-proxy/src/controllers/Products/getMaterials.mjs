'use strict';

import { Sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {

  const { Product } = models;
  const brands = await Product.findAll({
    attributes: [
      'material',
      [Sequelize.fn('count', Sequelize.col('Product.material')), 'count']
    ],
    group: ['Product.material']
  });

  const result = brands.map(productModel => {
    const productJSON = productModel.toJSON();
    return {
      material: productJSON['material'],
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
