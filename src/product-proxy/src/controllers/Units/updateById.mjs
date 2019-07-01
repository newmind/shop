'use strict';

import { sequelize, models } from '@packages/db';
import { sendEvent } from '@packages/rabbit';


export default () => async (ctx) => {

  const { unitId } = ctx.params;
  const { body } = ctx.request;
  const { Units } = models;

  const unit = await sequelize.transaction(async (transaction) => {

    await Units.update(body, {
      where: { id: unitId },
      transaction
    });

    return await Units.findOne({
      attributes: ['id', 'value', 'description'],
      where: { id: unitId },
      transaction,
    });
  });

  sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_UNIT_UPDATED'], JSON.stringify(unit));

  ctx.body = {
    success: true,
    data: unit,
  };
};
