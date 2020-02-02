'use strict';

import { sequelize, models } from '@sys.packages/db';
import { sendEvent } from '@sys.packages/rabbit';


export default () => async (ctx) => {
  try {

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

      return models['Category'].findOne({
        attributes: ['id', 'name', 'description'],
        where: {id: categoryId},
        transaction,
      });
    });

    sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_UPDATED'], JSON.stringify(category));

    ctx.body = {
      success: true,
      data: category,
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = { success: false, error: { code: '500', message: error['message'] }};
  }
};
