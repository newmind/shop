'use strict';

import { sequelize, models } from '@sys.packages/db';
import { sendEvent } from "@sys.packages/rabbit";


export default () => async (ctx) => {
  try {
    const { Currency } = models;
    const { id } = ctx['request']['body'];

    const transaction = await sequelize.transaction();

    await Currency.destroy({
      where: { id },
      transaction,
    });

    await transaction.commit();

    sendEvent(ctx.rabbit, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CURRENCY_DELETED'], id);

    ctx.body = {
      success: true,
      data: id,
    };
  }
  catch(e) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '500',
        message: e.message,
      }
    };
  }
};
