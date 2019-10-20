'use strict';

import requestUpdate from '../../requests/Product/updateById';


export default () => async (ctx) => {
  const { productId } = ctx.params;

  const { data } = await requestUpdate(productId, ctx.req);

  ctx.body = data;
}
