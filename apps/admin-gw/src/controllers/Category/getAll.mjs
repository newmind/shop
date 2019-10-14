'use strict';

import { get } from '../../requests/Category/index';


export default () => async (ctx) => {

  const { data } = await get();

  ctx.body = {
    items: data
  };
}
