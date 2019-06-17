'use strict';

import { sequelize, models } from '@packages/db';
// import { sendEvent } from "@packages/rabbit";


export default () => async (ctx) => {

  const { currencyId } = ctx['params'];

  console.log(11111, currencyId);

  await sequelize.transaction(async (transaction) => {

    await models['Currency'].destroy({
      where: { id: currencyId },
      transaction,
    });
  });

  // sendEvent(ctx.rabbit, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_DELETED'], productId);

  ctx.body = {
    success: true,
    data: null,
  };
};
