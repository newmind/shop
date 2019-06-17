'use strict';

import { models } from '@packages/db';


export default () => async (ctx) => {

  const currencies = await models['Currency'].findAll({
    attributes: ['id', 'value', 'description'],
    order: [['id', 'ASC']],
  });

  ctx.body = {
    success: true,
    data: [
      ...currencies,
    ],
  };
};
