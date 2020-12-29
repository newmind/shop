
import request from "@sys.packages/request";
import { getBuffer } from "@sys.packages/sys.utils";


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default () => async (ctx) => {
  const {id} = ctx['params'];
  const buffer = await getBuffer(ctx['req']);

  const data = await request({
    method: 'put',
    url: PRODUCT_API_SRV + '/products/' + id,
    headers: {
      'content-type': ctx['req']['headers']['content-type']
    },
    responseType: 'stream',
    data: buffer,
  });

  const resultBuffer = await getBuffer(data);
  const result = JSON.parse(resultBuffer.toString());

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
