'use strict';

import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const { Operation, OperationStock, Stock, Product, Gallery, Currency } = models;

    const operations = await Operation.findAll({
      where: ctx['query'],
      attributes: ['externalId', 'address', 'email', 'phone', 'name', 'surname', 'amount', 'pay', 'delivery', 'status', 'createdAt', 'updatedAt'],
      include: [
        {
          model: OperationStock,
          required: true,
          as: 'stock',
          attributes: ['id', 'type', 'recipe', 'lens'],
          include: [
            {
              model: Stock,
              required: true,
              attributes: ['id', 'amount'],
              as: 'product',
              include: [
                {
                  model: Currency,
                  required: false,
                  as: 'currency',
                  attributes: ['id', 'value']
                },
                {
                  model: Product,
                  attributes: ['id', 'name', 'brand'],
                  required: true,
                  as: 'product',
                  include: [
                    {
                      model: Gallery,
                      required: false,
                      as: 'gallery',
                      attributes: ['id'],
                    },
                  ]
                }
              ]
            }
          ]
        }
      ]
    });

    ctx.body = {
      success: true,
      data: operations,
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = { code: '', message: '' };
  }
};
