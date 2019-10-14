'use strict';

import { get } from '../../requests/Unit';


export default () => async (ctx) => {

  const { data } = await get();

  ctx.body = {
    items: data
  };
}
