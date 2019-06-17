'use strict';

import { sequelize, models } from '@packages/db';

// import { sendEvent } from "@packages/rabbit";

export default () => async (ctx) => {

  const formData = ctx.request.body;

  const currency = await sequelize.transaction(async (transaction) => {

    const { id } = await models['Currency'].create({
      ...formData,
    }, { transaction });

    return await models['Currency'].findOne({
      attributes: ['id', 'value', 'description'],
      where: { id: id },
      transaction
    });
  });

  // sendEvent(ctx.rabbit, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_CREATED'], JSON.stringify(product));

  ctx.body = {
    success: true,
    data: currency,
  };
};
