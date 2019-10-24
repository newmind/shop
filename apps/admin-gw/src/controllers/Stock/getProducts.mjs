'use strict';

import { get } from './requests';


export default () => async (ctx) => {

  const { data, meta } = await get();

  console.log(data);

  ctx.body = { data, meta };
}
