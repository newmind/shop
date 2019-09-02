'use strict';

import { refresh } from "../../requests/User";


export default () => async (ctx) => {

  const { token } = ctx.request.body;

  const { data } = await refresh(token);

  ctx.cookies.set('admin', encodeURIComponent(JSON.stringify(data)), {
    httpOnly: true,
    secure: JSON.parse(process.env['COOCIE_SECURE']),
  });

  ctx.body = {};
}
