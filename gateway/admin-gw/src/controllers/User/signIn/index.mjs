
import { UserNotFoundError } from '@packages/errors';

import request from "@sys.packages/request";


export default () => async (ctx) => {
  const formData = ctx['request']['body'];

  const { data } = await request({
    method: 'post',
    url: process.env['IDENTITY_API_SRV'] + '/connect',
    data: formData,
  });

  console.log(111, data);

  if ( ! data) {
    throw new UserNotFoundError();
  }

  console.log(123)

  ctx.cookies.set(process.env['COOKIE_NAME'], encodeURIComponent(JSON.stringify(data)), {
    httpOnly: true,
  });

  ctx.status = 200;
  ctx.body = {
    success: true,
    data: null,
  };
}
