'use strict';

import { update } from "../../requests/User";


export default () => async (ctx) => {
  try {

    const { id } = ctx['user'];
    const { body } = ctx['request'];

    const { data } = await update(id, body);

    ctx.body = data;

  } catch(error) {

    if ('response' in error) {
      let { status, data } = error['response'];
      ctx.throw(status, data);
    } else {
      ctx.throw(500, error['message']);
    }
  }
}
