'use strict';

import { sequelize, models } from '@packages/db';

import { sendEvent } from "@packages/rabbit";


export default () => async (ctx) => {

  const formData = ctx.request.body;
  const { Currency } = models;

  const currency = await sequelize.transaction(async (transaction) => {

    const { id } = await Currency.create({
      ...formData,
    }, { transaction });

    return await Currency.findOne({
      attributes: ['id', 'value', 'description'],
      where: { id: id },
      transaction
    });
  });

  sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_CREATED'], JSON.stringify(currency));

  ctx.body = {
    success: true,
    data: currency,
  };
};
