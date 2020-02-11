'use strict';

import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    const { Units } = models;

    const result = await Units.findAll({
      attributes: ['id', 'value', 'description'],
      order: [['id', 'ASC']],
    });

    ctx.body = {
      success: true,
      data: result,
    };
  }
  catch(e) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '500',
        message: e.message,
      },
    };
  }
};
