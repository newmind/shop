'use strict';

import { refresh } from "../../requests/User";


export default () => async (ctx) => {

  const { token } = ctx.request.body;

  const { data } = await refresh(token);

  ctx.body = data;
}
