'use strict';

import path from "path";

import { sequelize, models } from '@packages/db';
import { getFiles, saveFile } from "@packages/sys.utils";
import {sendEvent} from "@packages/rabbit";

const FILE_PATH = path.resolve(process.cwd(), 'files');


const saveFiles = (files, { productId }, { transaction }) => {
  return new Promise((resolve) => {

    Object.keys(files)
      .map(async (key, index) => {

        const fileBuffer = files[key]['buffer'];
        const FILE_NAME = files[key]['fileName'];

        await saveFile(fileBuffer, path.join(FILE_PATH, FILE_NAME));
        await models['Gallery'].create({ productId, file: FILE_NAME }, { transaction });

        if (Object.keys(files).length === index + 1) {
          resolve();
        }
      });
  });
};

export default () => async (ctx) => {

  const { files, fields } = await getFiles(ctx.req);

  const product = await sequelize.transaction(async (transaction) => {

    const { id } = await models['Product'].create(fields, { transaction });

    if (fields['attributes'].length) {
      const attributes = [...JSON.parse(fields['attributes'])]
        .map(item => {
          item['productId'] = id;
          return item;
        });

      await models['Attribute'].bulkCreate(attributes, { transaction });
    }

    await saveFiles(files, { productId: id }, { transaction });

    return await models['Product'].findOne({
      where: { id },
      attributes: ['id', 'name', 'brand', 'description', 'status'],
      include: [
        {
          model: models['Attribute'],
          required: false,
          as: 'attributes',
          attributes: ['id', 'name'],
        },
        {
          model: models['Gallery'],
          required: false,
          as: 'gallery',
          attributes: ['file'],
        },
      ], transaction });
  });

  sendEvent(ctx.rabbit, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_CREATED'], JSON.stringify(product));

  ctx.body = {
    success: true,
    data: product,
  };
};
