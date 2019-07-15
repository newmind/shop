'use strict';

import { sequelize, models } from '@sys.packages/db';

import { sendEvent } from "@sys.packages/rabbit";


export default () => async (ctx) => {

  try {

    const fields = ctx.request.body;

    const product = await sequelize.transaction(async (transaction) => {

      const { id } = await models['Stock'].create({
        ...fields,
      }, { transaction });

      return await models['Stock'].findOne({
        attributes: ['id', 'count', 'amount'],
        where: { id: id },
        include: [
          {
            model: models['Currency'],
            required: true,
            as: 'currency',
            attributes: ['id', 'value']
          },
          {
            model: models['Category'],
            required: false,
            as: 'category',
            attributes: ['id', 'name']
          },
          {
            model: models['Product'],
            attributes: ['id', 'name', 'brand', 'description', 'status'],
            required: true,
            as: 'product',
            where: { status: 1 },
            include: [
              {
                model: models['Attribute'],
                required: false,
                as: 'attributes',
                attributes: ['id', 'name', 'value'],
              },
              {
                model: models['Gallery'],
                required: false,
                as: 'gallery',
                attributes: ['id'],
              },
            ]
          }
        ], transaction });
    });

    console.log(product)

    sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_CREATED'], JSON.stringify(product));

    ctx.body = {
      success: true,
      data: product,
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
