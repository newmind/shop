'use strict';

import { sequelize, models } from '@packages/db';
import { sendEvent } from '@packages/rabbit';


export default () => async (ctx) => {

  const { currencyId } = ctx.params;
  const { body } = ctx.request;
  const { Currency } = models;

  const currency = await sequelize.transaction(async (transaction) => {

    await Currency.update({
      ...body,
    },
    {
      where: { id: currencyId },
      transaction
    });

    return await Currency.findOne({
      attributes: ['id', 'value', 'description'],
      where: { id: currencyId },
      transaction,
    });
  });

  sendEvent(ctx.rabbit, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_UPDATED'], JSON.stringify(currency));

  ctx.body = {
    success: true,
    data: currency,
  };
};
