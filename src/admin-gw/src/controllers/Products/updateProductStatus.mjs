'use strict';

import requestUpdate from '../../requests/Product/updateStatusById';


export default () => async (ctx) => {
  const { productId, status } = ctx.params;

  const { data } = await requestUpdate(productId, status);

  ctx.body = data;
}
