'use strict';

import { sequelize, models } from '@sys.packages/db';

import { sendEvent } from "@sys.packages/rabbit";


export default () => async (ctx) => {

  try {
    const { productId } = ctx['params'];

    console.log(111, productId)

    await sequelize.transaction(async (transaction) => {

      await models['Stock'].destroy({
        where: {id: Number(productId)},
        transaction,
      });
    });

    sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_DELETED'], productId);

    ctx.body = {
      success: true,
      data: Number(productId),
    };
  } catch (e) {
    console.log(e)
  }
};
