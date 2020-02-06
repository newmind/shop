'use strict';

import request from "../../../requests/Product/create";


export default () => async (ctx) => {

  const { data } = await request(ctx.req);

  ctx.body = data;
}
