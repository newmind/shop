
import request from "@sys.packages/request";

import productBuilder from "./productBuilder.mjs";


export default () => async (ctx) => {
  const { uuid } = ctx['params'];
  const { uuid: newUuid } = ctx['request']['body'];

  const result = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products/' + uuid + '/copy',
    method: 'post',
    data: {
      uuid: newUuid,
    }
  });

  ctx.body = {
    success: true,
    data: productBuilder(result['data']),
  };
}
