'use strict';

import { updateById } from '../../requests/SubProduct';


export default () => async (ctx) => {

  const { productId } = ctx.params;

  const { data } = await updateById(productId, ctx['req']);

  ctx.body = data;
}
