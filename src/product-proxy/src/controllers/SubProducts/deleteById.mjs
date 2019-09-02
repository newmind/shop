'use strict';

import { sequelize, models } from '@sys.packages/db';
import { sendEvent } from "@sys.packages/rabbit";


export default () => async (ctx) => {

  const { productId } = ctx['params'];
  const { SubProduct, Gallery } = models;

  await sequelize.transaction(async (transaction) => {

    await SubProduct.destroy({
      where: { id: productId },
      transaction,
    });

    await Gallery.destroy({
      where: { productId },
      transaction,
    })
  });

  sendEvent(process.env['RABBIT_SUB_PRODUCT_PROXY_EXCHANGE_PRODUCT_DELETED'], productId);

  ctx.body = {
    success: true,
    data: Number(productId),
  };
};
