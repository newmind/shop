'use strict';

import { sequelize, models } from '@packages/db';
// import { sendEvent } from "@packages/rabbit";


export default () => async (ctx) => {

  const { categoryId } = ctx['params'];

  try {
    await sequelize.transaction(async (transaction) => {

      await models['Category'].destroy({
        where: { id: categoryId },
        transaction,
      });
    });

    // sendEvent(ctx.rabbit, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_DELETED'], productId);

    ctx.body = {
      success: true,
      data: null,
    };

  } catch (error) {

    ctx.body = {
      success: false,
      error: {
        code: error.original.code,
        message: error.original.detail,
      }
    };
  }
};
