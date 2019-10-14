'use strict';

import { create } from "../../requests/Category/index";


export default () => async (ctx) => {

  const formData = ctx.request.body;

  const { data } = await create(formData);

  ctx.body = data;
}
