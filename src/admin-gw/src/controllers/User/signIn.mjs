'use strict';

import { signIn } from "../../requests/User";


export default () => async (ctx) => {
  try {

    const formData = ctx.request.body;
    const { data } = await signIn(formData);

    ctx.cookies.set('admin', JSON.stringify(data), {
      httpOnly: true,
      secure: ctx.request.protocol === 'https',
    });

    ctx.body = {};

  } catch(error) {

    const { status, data } = error['response'];

    ctx.throw(status, data);
  }
}
