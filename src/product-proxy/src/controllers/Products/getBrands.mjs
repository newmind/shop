'use strict';

import { Sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {

  const { Stock, Product } = models;
  const brands = await Stock.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'brand'],
        as: 'product',
        required: false,
      }
    ],
    // attributes: [
    //   [Sequelize.fn('count', Sequelize.col('product.brand')), 'count']
    // ],
    // order: [['brand', 'ASC']],
    group: ['Stock.id', 'product.brand'],
  });

  console.log(brands);

  // const result = brands.map(brand => ({
  //   brand: brand['brand'],
  //   count: brand['count']
  // }));

  ctx.body = {
    success: true,
    data: [
      ...brands,
    ],
  };
};
