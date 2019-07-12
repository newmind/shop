'use strict';

import { sequelize, models } from '@sys.packages/db';
import { sendEvent } from "@sys.packages/rabbit";


export default () => async (ctx) => {

  const { currencyId } = ctx['params'];
  const { Currency } = models;

  await sequelize.transaction(async (transaction) => {

    await Currency.destroy({
      where: { id: currencyId },
      transaction,
    });
  });

  sendEvent(ctx.rabbit, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_DELETED'], productId);

  ctx.body = {
    success: true,
    data: null,
  };
};
