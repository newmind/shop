'use strict';

import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const where = {};

    const { Operation, OperationStock, Product, Gallery, Currency } = models;
    const { externalId } = ctx['request']['query'];

    if (externalId) {
      where['externalId'] = externalId;
    }

    const operations = await Operation.findAll({
      where: { ...where },
      attributes: ['externalId', 'address', 'email', 'phone', 'name', 'surname', 'amount', 'pay', 'delivery', 'status', 'createdAt', 'updatedAt'],
      include: [
        {
          model: OperationStock,
          required: true,
          as: 'stock',
          attributes: ['id', 'type', 'recipe', 'lens'],
          include: [
            {
              model: Product,
              attributes: ['uuid', 'name', 'brand', 'params'],
              required: true,
              as: 'product',
              include: [
                {
                  model: Currency,
                  required: false,
                  as: 'currency',
                  attributes: ['id', 'value']
                },
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
    });

    ctx.body = {
      success: true,
      data: operations,
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = { code: '500', message: error['message'] };
  }
};
