
import request from 'axios';

const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default () => async (ctx) => {
  try {
    const { fileName } = ctx['params'];
    const { data } = await request({
      method: 'get',
      url: `${PRODUCT_API_SRV}/gallery/${fileName}`,
      responseType: 'stream',
    });

    ctx.body = data;
  }
  catch(e) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: { code: '500', message: '' },
    };
  }
}
