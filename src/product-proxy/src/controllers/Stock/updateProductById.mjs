'use strict';

import { sequelize, models } from '@packages/db';

import { sendEvent } from '@packages/rabbit';


export default () => async (ctx) => {

  const { productId } = ctx.params;
  const { body } = ctx.request;

  const product = await sequelize.transaction(async (transaction) => {

    await models['Stock'].update(body, { where: { id: productId }, transaction });

    return await models['Stock'].findOne({
      attributes: ['id', 'count', 'amount'],
      where: { id: productId },
      include: [
        {
          model: models['Currency'],
          required: true,
          as: 'currency',
          attributes: ['id', 'value']
        },
        {
          model: models['Category'],
          required: true,
          as: 'category',
          attributes: ['id', 'name']
        },
        {
          model: models['Product'],
          attributes: ['id', 'name', 'brand', 'description', 'status'],
          required: true,
          as: 'product',
          where: { status: 1 },
          include: [
            {
              model: models['Attribute'],
              required: false,
              as: 'attributes',
              attributes: ['id', 'name', 'value'],
            },
            {
              model: models['Gallery'],
              required: false,
              as: 'gallery',
              attributes: ['file'],
            },
          ]
        }
      ], transaction });
  });

  sendEvent(ctx.rabbit, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_UPDATED'], JSON.stringify(product));

  ctx.body = {
    success: true,
    data: product,
  };
};
