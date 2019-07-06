'use strict';

import fs from 'fs';
import path from "path";

import { sequelize, models } from '@packages/db';
import { sendEvent } from "@packages/rabbit";

const FILE_PATH = path.resolve(process.cwd(), 'files');


export default () => async (ctx) => {

  const { productId } = ctx['params'];
  const { Product, Gallery } = models;

  await sequelize.transaction(async (transaction) => {

    await Product.destroy({
      where: { id: productId },
      transaction,
    });

    await Gallery.destroy({
      where: { productId },
      transaction,
    })
  });

  sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_DELETED'], productId);

  ctx.body = {
    success: true,
    data: Number(productId),
  };
};
