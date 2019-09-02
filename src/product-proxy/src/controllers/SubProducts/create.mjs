'use strict';

import { sequelize, models } from '@sys.packages/db';
import { getFiles } from "@sys.packages/sys.utils";
import { sendEvent } from "@sys.packages/rabbit";


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
  const { SubProduct, Gallery } = models;

  const product = await sequelize.transaction(async (transaction) => {

    const { id } = await SubProduct.create(fields, { transaction });

    if (Object.keys(files).length) {
      await saveFiles(files, { productId: id }, { transaction });
    }

    return SubProduct.findOne({
      where: { id },
      attributes: ['id', 'name', 'brand', 'description', 'status'],
      include: [
        {
          model: Gallery,
          required: false,
          as: 'gallery',
          attributes: ['id'],
        },
      ], transaction });
  });

  sendEvent(process.env['RABBIT_SUB_PRODUCT_PROXY_EXCHANGE_PRODUCT_CREATED'], JSON.stringify(product));

  ctx.body = {
    success: true,
    data: product,
  };
};
