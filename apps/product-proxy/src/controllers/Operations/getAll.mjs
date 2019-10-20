'use strict';

import { models, Sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const { Operation } = models;

    const operations = await Operation.findAll({
      attributes: ['id', 'externalId', 'details', 'paymentMethod', 'amount', 'status'],
      // order: [
      //   ['id', 'asc'],
      //   ['product', 'gallery', 'id', 'asc']
      // ],
      // include: [
      //   {
      //     model: Currency,
      //     required: false,
      //     as: 'currency',
      //     attributes: ['id', 'value']
      //   },
      //   {
      //     model: Category,
      //     required: false,
      //     as: 'category',
      //     attributes: ['id', 'name']
      //   },
      //   {
      //     model: Comment,
      //     required: false,
      //     as: 'comments',
      //     attributes: ['evaluation', 'person', 'comment'],
      //   },
      //   {
      //     model: Product,
      //     attributes: ['id', 'name', 'brand', 'color', 'material', 'form', 'description', 'status'],
      //     required: true,
      //     as: 'product',
      //     where: { status: 1, ...productWhere },
      //     include: [
      //       {
      //         model: Attribute,
      //         required: false,
      //         as: 'attributes',
      //         attributes: ['id', 'name', 'value'],
      //       },
      //       {
      //         model: Gallery,
      //         required: false,
      //         as: 'gallery',
      //         attributes: ['id'],
      //       },
      //     ]
      //   }
      // ],
    });

    ctx.body = {
      success: true,
      data: {
        items: operations,
        meta: {
          count: 0
        }
      },
    };
  } catch(error) {
    ctx.throw(new Error(error['message']));
  }
};
