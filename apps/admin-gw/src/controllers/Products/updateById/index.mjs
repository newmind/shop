'use strict';

import requestUpdate from '../../../requests/Product/updateById';


export default () => async (ctx) => {
  try {
    const { productId } = ctx.params;

    const { data } = await requestUpdate(productId, ctx.req);

    ctx.body = data;
  }
  catch(error) {

    ctx.status = 500;
    ctx.body = { success: false, error: { code: '500', message: error['message'] }};
  }
}
