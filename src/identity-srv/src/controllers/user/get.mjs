'use strict';

import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  try {

    const { Passport } = models;
    const { id } = ctx['params'];

    const passport = await Passport.findOne({
      where: { userId: id }
    });

    ctx.body = {
      success: true,
      data: passport ? passport.toJSON() : {},
    };

  } catch(e) {

  }
};
