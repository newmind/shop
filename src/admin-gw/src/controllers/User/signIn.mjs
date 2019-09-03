'use strict';

import { signIn, get } from "../../requests/User";
import { decode } from '@sys.packages/jwt';


export default () => async (ctx) => {
  try {

    const formData = ctx.request.body;
    const { data } = await signIn(formData);

    const { id } = await decode(data['token'], process.env['JWT_SECRET']);

    const { data: profile } = await get(id);

    ctx.cookies.set(process.env['COOKIE_NAME'], encodeURIComponent(JSON.stringify(data)), {
      httpOnly: true,
      secure: JSON.parse(process.env['COOKIE_SECURE']),
    });

    ctx.body = {
      ...profile,
    };

  } catch(error) {

    const { status, data } = error['response'];

    ctx.throw(status, data);
  }
}
