'use strict';

import { sequelize, models } from '@packages/db';
import { sendEvent } from '@packages/rabbit';


export default () => async (ctx) => {

  const { categoryId } = ctx.params;
  const { body } = ctx.request;

  const category = await sequelize.transaction(async (transaction) => {

    await models['Category'].update({
      ...body,
    },
    {
      where: { id: categoryId },
      transaction
    });

    return await models['Category'].findOne({
      attributes: ['id', 'name', 'description'],
      where: { id: categoryId },
      transaction,
    });
  });

  sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_UPDATED'], JSON.stringify(category));

  ctx.body = {
    success: true,
    data: category,
  };
};
