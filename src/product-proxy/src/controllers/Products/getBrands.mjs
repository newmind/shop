'use strict';

import { sequelize, models } from '@packages/db';


export default () => async (ctx) => {

  const brands = await models['Product'].findAll({
    attributes: ['brand'],
    order: [['brand', 'ASC']],
    group: ['brand']
  });

  const result = brands.map(item => item['brand']);

  ctx.body = {
    success: true,
    data: [
      ...result,
    ],
  };
};
