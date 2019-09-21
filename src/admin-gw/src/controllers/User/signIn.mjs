'use strict';

import { NotFoundError } from '@packages/errors';

import { signIn } from "./requests";


export default () => async (ctx) => {
  try {

    const formData = ctx['request']['body'];

    const { data } = await signIn(formData);

    ctx.cookies.set(process.env['COOKIE_NAME'], encodeURIComponent(JSON.stringify(data)), {
      httpOnly: true,
    });

    ctx.status = 200;
    ctx.body = {};

  } catch(error) {

    if (error instanceof NotFoundError) {
      ctx.status = 404;
      return ctx.body = {
        success: true,
        data: error['data'],
      };
    }

    ctx.status = error['status'];
    ctx.body = {
      success: false,
      error: {
        code: '',
        message: 'Пользователь не найден',
      },
    };
  }
}
