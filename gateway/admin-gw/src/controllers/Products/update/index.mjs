
import request from "@sys.packages/request";

import { getBuffer } from "@sys.packages/sys.utils";


export default () => async (ctx) => {
  const { id } = ctx['params'];
  const buffer = await getBuffer(ctx['req']);

  await request({
    method: 'put',
    url: process.env['PRODUCT_API_SRV'] + '/products/' + id,
    headers: {
      'content-type': ctx['req']['headers']['content-type']
    },
    responseType: 'stream',
    data: buffer,
  });

  ctx.body = {
    success: true,
    data: null,
  };
}
