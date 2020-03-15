'use strict';

import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {

    const { Passport } = models;
    const { id } = ctx['params'];

    const passport = await Passport.findOne({
      where: { userId: id }
    });

    ctx.status = 200;
    ctx.body = {
      success: true,
      data: passport ? passport.toJSON() : null,
    };
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: 500,
        message: error['message'],
      }
    };
  }
};
