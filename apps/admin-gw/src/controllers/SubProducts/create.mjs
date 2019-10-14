'use strict';

import { create } from "../../requests/SubProduct";


export default () => async (ctx) => {

  const { data } = await create(ctx['req']);

  ctx.body = data;
}
