
import request from "@sys.packages/request";
import { getBuffer } from "@sys.packages/sys.utils";


export default () => async (ctx) => {
  const buffer = await getBuffer(ctx['req']);

  await request({
    method: 'post',
    url: process.env['PRODUCT_API_SRV'] + '/products',
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
