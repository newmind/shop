'use strict';

import { signIn } from "../../requests/User";


export default () => async (ctx) => {

  const formData = ctx.request.body;

  const { data } = await signIn(formData);

  ctx.body = data;
}
