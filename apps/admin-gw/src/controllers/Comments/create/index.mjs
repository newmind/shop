
import request from "@sys.packages/request";
import { getBuffer } from "@sys.packages/sys.utils";


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default () => async (ctx) => {
  try {
    const buffer = await getBuffer(ctx['req']);

    const data = await request({
      method: 'post',
      url: PRODUCT_API_SRV + '/products',
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
  catch(e) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: '500',
        message: e.message,
      },
    };
  }
}
