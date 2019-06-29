'use strict';

import { sequelize, models } from '@packages/db';

// import { sendEvent } from "@packages/rabbit";


export default () => async (ctx) => {

  const { Comment } = models;
  const { productId } = ctx.params;
  const { ...formData } = ctx.request.body;

  console.log(111, formData);

  const component = await sequelize.transaction(async (transaction) => {

    return await Comment.create({
      productId,
      ...formData
    }, { transaction });
  });

  // sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_CREATED'], JSON.stringify(component));

  ctx.body = {
    success: true,
    data: component,
  };
};
