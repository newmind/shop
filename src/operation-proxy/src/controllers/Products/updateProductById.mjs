'use strict';

import path from "path";

import { sequelize, models } from '@packages/db';
import { getFiles, saveFile } from "@packages/utils";
import { sendEvent } from '@packages/rabbit';


const FILE_PATH = path.resolve(process.cwd(), 'files');


const saveFiles = (files, { productId }, { transaction }) => {
  return new Promise((resolve) => {

    if ( ! Object.keys(files).length) {
      resolve();
    }

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

  const { productId } = ctx.params;
  const { files, fields } = await getFiles(ctx.req);

  const product = await sequelize.transaction(async (transaction) => {

    await models['Attribute'].destroy({ where: { productId }}, { transaction });

    const attributes = [...JSON.parse(fields['attributes'])]
      .map(item => {
        item['productId'] = productId;
        return item;
      });

    await models['Attribute'].bulkCreate(attributes, { transaction });

    await models['Product'].update(fields, { where: { id: productId }, transaction });

    await saveFiles(files, { productId }, { transaction });



    return await models['Product'].findOne({
      where: { id: productId },
      attributes: ['id', 'name', 'brand', 'description', 'amount', 'status'],
      include: [
        {
          model: models['Currency'],
          required: true,
          as: 'currency',
          attributes: ['id', 'value']
        },
        {
          model: models['Attribute'],
          required: false,
          as: 'attributes',
          attributes: ['name', 'value'],
        },
        {
          model: models['Gallery'],
          required: false,
          as: 'gallery',
          attributes: ['file'],
        },
      ],
      transaction });
  });

  sendEvent(ctx.rabbit, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_UPDATED'], JSON.stringify(product));

  ctx.body = {
    success: true,
    data: product,
  };
};
