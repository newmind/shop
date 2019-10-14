'use strict';

import { models } from '@sys.packages/db';


export default () => async (ctx) => {

  const { Units } = models;

  const units = await Units.findAll({
    attributes: ['id', 'value', 'description'],
    order: [['id', 'ASC']],
  });

  ctx.body = {
    success: true,
    data: [
      ...units,
    ],
  };
};
