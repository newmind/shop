'use strict';

import { create } from "../../requests/Unit";


export default () => async (ctx) => {

  const formData = ctx.request.body;

  const { data } = await create(formData);

  ctx.body = data;
}
