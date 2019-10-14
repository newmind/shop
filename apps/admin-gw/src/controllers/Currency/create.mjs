'use strict';

import request from "../../requests/Currency/create";


export default () => async (ctx) => {

  const formData = ctx.request.body;

  const { data } = await request(formData);

  ctx.body = data;
}
