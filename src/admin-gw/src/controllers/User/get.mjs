'use strict';

import { get } from "../../requests/User";


export default () => async (ctx) => {
  try {

    const { id } = ctx.user || {};
    const { data } = await get(id);

    delete data['id'];
    delete data['userId'];

    ctx.body = data;

  } catch(error) {

    console.log(error);

    const { status, data } = error['response'];

    ctx.throw(status, data);
  }
}
