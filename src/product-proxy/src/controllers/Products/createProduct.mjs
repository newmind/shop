'use strict';

import { sequelize, models } from '@packages/db';
import { getFiles, saveFile } from "@packages/sys.utils";
import { sendEvent } from "@packages/rabbit";


const saveFiles = (files, { productId }, { transaction }) => {

  const { Gallery } = models;

  return new Promise((resolve) => {

    Object.keys(files)
      .map(async (key, index) => {

        const fileBuffer = files[key]['buffer'];

        await Gallery.create({ productId, file: fileBuffer, order: index }, { transaction });

        if (Object.keys(files).length === index + 1) {
          resolve();
        }
      });
  });
};

export default () => async (ctx) => {

  const { files, fields } = await getFiles(ctx.req);
  const { Attribute, Product, Gallery } = models;

  const product = await sequelize.transaction(async (transaction) => {

    const { id } = await models['Product'].create(fields, { transaction });

    const { attributes = null } = fields;

    if (attributes) {

      const attributes = [...JSON.parse(fields['attributes'])]
        .map(item => {
          item['productId'] = id;
          return item;
        });

      await Attribute.bulkCreate(attributes, { transaction });
    }

    if (Object.keys(files).length) {
      await saveFiles(files, { productId: id }, { transaction });
    }

    return await Product.findOne({
      where: { id },
      attributes: ['id', 'name', 'brand', 'description', 'status'],
      include: [
        {
          model: Attribute,
          required: false,
          as: 'attributes',
          attributes: ['id', 'name'],
        },
        {
          model: Gallery,
          required: false,
          as: 'gallery',
          attributes: ['id'],
        },
      ], transaction });
  });

  sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_CREATED'], JSON.stringify(product));

  ctx.body = {
    success: true,
    data: product,
  };
};
