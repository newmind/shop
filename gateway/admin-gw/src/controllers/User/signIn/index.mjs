
import { UserNotFoundError } from '@packages/errors';

import request from "@sys.packages/request";


const INVOICE_API_SRV = process.env['INVOICE_API_SRV'];


export default () => async (ctx) => {
  const formData = ctx['request']['body'];

  const { data } = await request({
    method: 'post',
    url: INVOICE_API_SRV + '/connect',
    data: formData,
  });

  if ( ! data) {
    throw new UserNotFoundError();
  }

  ctx.cookies.set(process.env['COOKIE_NAME'], encodeURIComponent(JSON.stringify(data)), {
    httpOnly: true,
  });

  ctx.status = 200;
  ctx.body = {
    success: true,
    data: null,
  };
}
