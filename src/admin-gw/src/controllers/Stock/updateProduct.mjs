'use strict';

import requestUpdate from '../../requests/Stock/updateById';


export default () => async (ctx) => {

  const { productId } = ctx.params;
  const { body } = ctx.request;

  const { data } = await requestUpdate(productId, body);

  ctx.body = data;
}
