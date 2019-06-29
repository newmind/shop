'use strict';

import { sequelize, models } from '@packages/db';
import { sendEvent } from '@packages/rabbit';


export default () => async (ctx) => {

  const { currencyId } = ctx.params;
  const { body } = ctx.request;

  const currency = await sequelize.transaction(async (transaction) => {

    await models['Currency'].update({
      ...body,
    },
    {
      where: { id: currencyId },
      transaction
    });

    return await models['Currency'].findOne({
      attributes: ['id', 'value', 'description'],
      where: { id: currencyId },
      transaction,
    });
  });

  sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_UPDATED'], JSON.stringify(currency));

  ctx.body = {
    success: true,
    data: currency,
  };
};
