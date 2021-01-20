
import request from "@sys.packages/request";
import { getBuffer } from "@sys.packages/sys.utils";

import productBuilder from '../_utils/productBuilder.mjs';


export default () => async (ctx) => {
  const buffer = await getBuffer(ctx['req']);

  const result = await request({
    method: 'post',
    url: process.env['PRODUCT_API_SRV'] + '/products',
    headers: {
      'content-type': ctx['req']['headers']['content-type']
    },
    responseType: 'stream',
    data: buffer,
  });

  const resultBuffer = await getBuffer(result);
  const resultData = JSON.parse(resultBuffer.toString());

  ctx.body = {
    success: true,
    data: productBuilder(resultData['data']),
  };
}
