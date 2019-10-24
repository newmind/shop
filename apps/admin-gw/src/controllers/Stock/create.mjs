'use strict';

import { create } from "./requests";


export default () => async (ctx) => {

  const { body } = ctx.request;

  const { data } = await create(body);

  ctx.body = data;
}
