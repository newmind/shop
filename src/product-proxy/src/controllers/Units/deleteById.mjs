'use strict';

import { sequelize, models } from '@packages/db';
// import { sendEvent } from "@packages/rabbit";


export default () => async (ctx) => {

  const { unitId } = ctx['params'];
  const { Units } = models;

  await sequelize.transaction(async (transaction) => {

    await Units.destroy({
      where: { id: unitId },
      transaction,
    });
  });

  // sendEvent(ctx.rabbit, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_DELETED'], productId);

  ctx.body = {
    success: true,
    data: null,
  };
};
