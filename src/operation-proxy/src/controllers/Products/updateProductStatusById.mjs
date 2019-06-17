'use strict';

import { sequelize, models } from '@packages/db';
import { sendEvent } from "@packages/rabbit";


export default () => async (ctx) => {

  const { productId, status } = ctx.params;

  const product = await sequelize.transaction(async (transaction) => {

    await models['Product'].update({ status }, { where: { id: productId }, transaction });

    return await models['Product'].findOne({
      where: { id: productId },
      attributes: ['id', 'name', 'brand', 'description', 'amount', 'status'],
      include: [
        {
          model: models['Currency'],
          required: true,
          as: 'currency',
          attributes: ['id', 'value']
        },
        {
          model: models['Attribute'],
          required: false,
          as: 'attributes',
          attributes: ['name', 'value'],
        },
        {
          model: models['Gallery'],
          required: false,
          as: 'gallery',
          attributes: ['file'],
        },
      ],
      transaction });
  });

  sendEvent(ctx.rabbit, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_UPDATED'], JSON.stringify(product));

  ctx.body = {
    success: true,
    data: product,
  };
};
