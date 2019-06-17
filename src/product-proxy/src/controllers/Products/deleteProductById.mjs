'use strict';

import fs from 'fs';
import path from "path";

import { sequelize, models } from '@packages/db';
import { sendEvent } from "@packages/rabbit";

const FILE_PATH = path.resolve(process.cwd(), 'files');


export default () => async (ctx) => {

  const { productId } = ctx['params'];

  await sequelize.transaction(async (transaction) => {

    await models['Product'].destroy({
      where: { id: productId },
      transaction,
    });

    const images = await models['Gallery'].findAll({
      where: { productId }
    }, { transaction });

    images.forEach(image => fs.unlinkSync(path.join(FILE_PATH, image['file'])));

    await models['Gallery'].destroy({
      where: { productId },
      transaction,
    })
  });

  sendEvent(ctx.rabbit, process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_DELETED'], productId);

  ctx.body = {
    success: true,
    data: Number(productId),
  };
};
