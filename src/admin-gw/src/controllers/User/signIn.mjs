'use strict';

import { signIn } from "../../requests/User";


export default () => async (ctx) => {
  try {

    const formData = ctx.request.body;
    const { data } = await signIn(formData);

    ctx.body = data;

  } catch(error) {

    const { status, data } = error['response'];

    ctx.throw(status, data);
  }
}
