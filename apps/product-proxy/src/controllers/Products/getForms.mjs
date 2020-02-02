'use strict';

import { Sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {

  const { Product } = models;
  const brands = await Product.findAll({
    attributes: [
      'form',
      [Sequelize.fn('count', Sequelize.col('Product.form')), 'count']
    ],
    group: ['Product.form']
  });

  const result = brands.map(productModel => {
    const productJSON = productModel.toJSON();
    return {
      form: productJSON['form'],
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
