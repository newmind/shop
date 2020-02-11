'use strict';

import { sequelize, models } from '@sys.packages/db';
import { sendEvent } from "@sys.packages/rabbit";


export default () => async (ctx) => {
  try {
    const { id } = ctx['request']['body'];
    const { Product, Attribute, Gallery } = models;

    const transaction = await sequelize.transaction();

    await Attribute.destroy({
      where: { productId: id },
      transaction,
    });

    await Gallery.destroy({
      where: { productId: id },
      transaction,
    });

    await Product.destroy({
      where: { id },
      transaction,
    });

    await transaction.commit();

    sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_DELETED'], id);

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
      },
    };
  }
};
