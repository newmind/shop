'use strict';

import { sequelize, models } from '@packages/db';

import { sendEvent } from "@packages/rabbit";


export default () => async (ctx) => {

  const formData = ctx.request.body;
  const { Units } = models;

  const unit = await sequelize.transaction(async (transaction) => {

    const { id } = await Units.create({
      ...formData,
    }, { transaction });

    return await Units.findOne({
      attributes: ['id', 'value', 'description'],
      where: { id: id },
      transaction
    });
  });

  // sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_CREATED'], JSON.stringify(currency));

  ctx.body = {
    success: true,
    data: unit,
  };
};
