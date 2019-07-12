'use strict';

import { models } from '@sys.packages/db';


export default () => async (ctx) => {

  const categories = await models['Category'].findAll({
    attributes: ['id', 'name', 'description'],
    order: [['id', 'ASC']],
  });

  ctx.body = {
    success: true,
    data: [
      ...categories,
    ],
  };
};
