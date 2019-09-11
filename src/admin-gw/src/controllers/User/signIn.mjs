'use strict';

import { decode } from '@sys.packages/jwt';

import { signIn, get } from "./requests";


export default () => async (ctx) => {
  try {

    const formData = ctx['request']['body'];

    const { data } = await signIn(formData);
    const { id } = await decode(data['token'], process.env['JWT_SECRET']);

    const { data: profile } = await get(id);

    ctx.cookies.set(process.env['COOKIE_NAME'], encodeURIComponent(JSON.stringify(data)), {
      httpOnly: true,
    });

    ctx.status = 200;
    ctx.body = {
      ...profile,
    };

  } catch(error) {

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
