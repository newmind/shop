'use strict';

import { sequelize, models } from '@sys.packages/db';
import { sendEvent } from '@sys.packages/rabbit';


export default () => async (ctx) => {
  try {
    const { Units } = models;
    const { id } = ctx['params'];
    const data = ctx['request']['body'];

    const transaction = await sequelize.transaction();

    const result = await Units.update(data, {
      where: { id },
      transaction
    });

    await transaction.commit();

    sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_UNIT_UPDATED'], JSON.stringify(result.toJSON()));

    ctx.body = {
      success: true,
      data: result.toJSON(),
    };
  }
  catch(e) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '500',
        message: e.message,
      },
    };
  }
};
