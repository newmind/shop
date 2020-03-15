'use strict';

import { update } from "./requests";


export default () => async (ctx) => {
  try {

    const { id } = ctx['user'];
    const { body } = ctx['request'];

    if ( ! id) {
      ctx.status = 401;
      return ctx.body = {
        success: false,
        error: {
          code: 401,
          message: 'Unauthorized'
        },
      };
    }

    const { data } = await update(id, body);

    ctx.body = {
      success: true,
      data: data,
    };
  }
  catch(error) {

    if ('response' in error) {
      let { status, data } = error['response'];
      ctx.throw(status, data);
    } else {
      ctx.throw(500, error['message']);
    }
  }
}
