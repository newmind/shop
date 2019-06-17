'use strict';

import { sequelize, models } from '@packages/db';

import { sendEvent } from "@packages/rabbit";


export default () => async (ctx) => {

  const { productId } = ctx['params'];

  await sequelize.transaction(async (transaction) => {

    await models['Stock'].destroy({
      where: { id: productId },
      transaction,
    });
  });

  sendEvent(ctx.rabbit, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_DELETED'], productId);

  ctx.body = {
    success: true,
    data: Number(productId),
  };
};
