
import request from 'axios';


export default () => async (ctx) => {
  try {
    const { fileName } = ctx['params'];
    const { data } = await request({
      method: 'get',
      url: process.env['PRODUCT_API_SRV'] + `/images/${fileName}`,
      responseType: 'stream',
    });

    ctx.body = data;
  }
  catch(e) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: { code: '500', message: e['message'] },
    };
  }
}
