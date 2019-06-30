'use strict';

import { sequelize, models } from '@packages/db';
import { sendEvent } from "@packages/rabbit";


export default () => async (ctx) => {

  const { productId, status } = ctx.params;

  const product = await sequelize.transaction(async (transaction) => {

    await models['Product'].update({ status }, { where: { id: productId }, transaction });

    return await models['Product'].findOne({
      where: { id: productId },
      attributes: ['id', 'name', 'brand', 'description', 'status'],
      include: [
        {
          model: models['Attribute'],
          required: false,
          as: 'attributes',
          attributes: ['name', 'value'],
          include: [
            {
              model: models['Units'],
              required: false,
              as: 'unit',
              attributes: ['id', 'value']
            }
          ]
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

  sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_UPDATED'], JSON.stringify(product));

  ctx.body = {
    success: true,
    data: product,
  };
};
