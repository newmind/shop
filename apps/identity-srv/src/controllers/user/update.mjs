'use strict';

import { models } from '@sys.packages/db';
import {sendEvent} from "@sys.packages/rabbit";


export default () => async (ctx) => {

  try {

    const { Passport } = models;
    const { id } = ctx['params'];
    const { body } = ctx['request'];

    await Passport.update(body, {
      where: { userId: id }
    });

    const passport = await Passport.findOne({
      where: { userId: id },
    });

    sendEvent(process.env['RABBIT_IDENTITY_SRV_EXCHANGE_PASSPORT_UPDATED'], JSON.stringify(passport));

    ctx.body = {
      success: true,
      data: passport,
    };

  } catch(e) {
    console.log(e);
  }
};
