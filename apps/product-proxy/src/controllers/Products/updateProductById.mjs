'use strict';

import { sendEvent } from '@sys.packages/rabbit';
import { getFiles } from "@sys.packages/sys.utils";
import { sequelize, models } from '@sys.packages/db';


const saveFiles = (files, { productId }, { transaction }) => {

  const { Gallery } = models;

  return new Promise((resolve) => {

    if ( ! Object.keys(files).length) {
      resolve();
    }

    Object.keys(files)
      .map(async (key, index) => {

        const fileBuffer = files[key]['buffer'];

        await Gallery.create({ productId, file: fileBuffer }, { transaction });

        if (Object.keys(files).length === index + 1) {
          resolve();
        }
      });
  });
};

export default () => async (ctx) => {
  try {
    const { productId } = ctx.params;
    const { files, fields } = await getFiles(ctx.req);
    const { Attribute, Product, Units, Gallery, Currency, Category } = models;

    const product = await sequelize.transaction(async (transaction) => {

      await Attribute.destroy({ where: { productId }}, { transaction });

      const attributes = [...JSON.parse(fields['attributes'])]
        .map(item => {
          item['productId'] = productId;
          item['unitId'] < 0 && delete item['unitId'];
          return item;
        });

      await Attribute.bulkCreate(attributes, { transaction });

      await Product.update({
          categoryId: Number(fields['categoryId']),
          brand: fields['brand'],
          name: fields['name'],
          color: fields['color'],
          material: fields['material'],
          form: fields['form'],
          description: fields['description'],
          amount: Number(fields['amount']),
          currencyId: Number(fields['currencyId']),
          saleAmount: Number(fields['saleAmount']),
          count: fields['count'],
          status: Number(fields['status']),
        }, {
          where: { id: productId }, transaction }
      );

      await saveFiles(files, { productId }, { transaction });

      return Product.findOne({
        where: { id: productId },
        attributes: ['id', 'brand', 'name', 'color', 'material', 'form', 'description', 'status', 'amount', 'saleAmount', 'count', 'isHit', 'isSale', 'createdAt'],
        include: [
          {
            model: Category,
            required: false,
            as: 'category',
            attributes: ['id', 'name']
          },
          {
            model: Currency,
            required: false,
            as: 'currency',
            attributes: ['id', 'value'],
          },
          {
            model: Attribute,
            required: false,
            as: 'attributes',
            attributes: ['name', 'value'],
            include: [
              {
                model: Units,
                required: false,
                as: 'unit',
                attributes: ['id', 'value']
              }
            ]
          },
          {
            model: Gallery,
            required: false,
            as: 'gallery',
            attributes: ['id'],
          },
        ],
        transaction });
    });

    const result = product.toJSON();

    sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_UPDATED'], JSON.stringify(result));

    ctx.body = {
      success: true,
      data: result,
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = { success: false, error: { code: '500', message: error['message'] }};
  }
};
