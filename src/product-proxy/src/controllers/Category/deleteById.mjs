'use strict';

import { sequelize, models } from '@packages/db';
import { sendEvent } from "@packages/rabbit";


export default () => async (ctx) => {

  const { categoryId } = ctx['params'];

  try {
    await sequelize.transaction(async (transaction) => {

      await models['Category'].destroy({
        where: { id: categoryId },
        transaction,
      });
    });

    sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_DELETED'], categoryId);

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
