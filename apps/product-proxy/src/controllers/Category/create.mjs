'use strict';

import { sequelize, models } from '@sys.packages/db';

import { sendEvent } from "@sys.packages/rabbit";


export default () => async (ctx) => {
  try {
    const formData = ctx.request.body;
    const { Category } = models;

    const category = await sequelize.transaction(async (transaction) => {

      const { id } = await Category.create({
        ...formData,
      }, { transaction });

      return Category.findOne({
        attributes: ['id', 'name', 'description'],
        where: { id: id },
        transaction
      });
    });

    sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_CATEGORY_CREATED'], JSON.stringify(category));

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
