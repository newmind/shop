
import request from 'axios';


export default () => async (ctx) => {
  try {
    const { id } = ctx['params'];

    const { data } = await request({
      method: 'get',
      url: process.env['PRODUCT_API_SRV'] + '/gallery/' + id,
      responseType: 'stream',
    });

    ctx.body = data;
  }
  catch (e) {

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
