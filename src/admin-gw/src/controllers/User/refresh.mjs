'use strict';

import { refresh } from "../../requests/User";


export default () => async (ctx) => {

  const { token } = ctx.request.body;

  console.log(8234297429374, token);

  const { data } = await refresh(token);

  ctx.body = data;
}
